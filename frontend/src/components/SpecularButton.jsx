import React, { useRef, useEffect, useCallback } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './SpecularButton.css';

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform vec3 uLineColor;
uniform float uTime;
uniform bool uFollowMouse;
uniform bool uAutoAnimate;
uniform float uSpeed;
varying vec2 vUv;

float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

void main() {
    vec2 pixelCoord = vUv * uResolution;
    vec2 halfRes = uResolution * 0.5;
    vec2 centerCoord = pixelCoord - halfRes;

    float r = min(uRadius, min(halfRes.x, halfRes.y));
    float dist = roundedBoxSDF(centerCoord, halfRes, r);

    // Border mask
    float border = 1.0 - smoothstep(0.0, uThickness * 1.5, abs(dist));
    
    // Specular light position
    vec2 lightPos;
    if (uAutoAnimate) {
        float angle = uTime * uSpeed * 2.0;
        lightPos = vec2(cos(angle), sin(angle)) * (halfRes - vec2(r));
    } else if (uFollowMouse) {
        lightPos = uMouse - halfRes;
    } else {
        lightPos = vec2(0.0);
    }

    float lightDist = length(centerCoord - lightPos);
    float shine = exp(-pow(lightDist / max(uShineFade * 2.0, 10.0), 2.0)) * uIntensity;
    
    // Combined edge shine
    float edgeLight = border * shine * (1.0 + uShineSize * 0.05);

    vec3 finalColor = uLineColor * edgeLight;
    float alpha = clamp(edgeLight, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, alpha);
}
`;

function hexToRgb(hex) {
  let cleaned = hex.replace('#', '');
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleaned, 16);
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255
  ];
}

export default function SpecularButton({
  children = 'Get Started',
  size = 'lg',
  radius = 18,
  tint = '#ffffff',
  tintOpacity = 0,
  blur = 0,
  textColor = '#ffffff',
  lineColor = '#ffffff',
  baseColor = '#10b981',
  intensity = 1.2,
  shineSize = 12,
  shineFade = 45,
  thickness = 1.5,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  className = '',
  style = {},
  onClick,
  ...props
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new Renderer({
      canvas,
      alpha: true,
      premultipliedAlpha: false,
      antialias: true
    });

    const gl = renderer.gl;
    glRef.current = { renderer, gl };

    const geometry = new Triangle(gl);
    const rgb = hexToRgb(lineColor);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      transparent: true,
      uniforms: {
        uResolution: { value: [canvas.clientWidth, canvas.clientHeight] },
        uMouse: { value: [0, 0] },
        uRadius: { value: radius },
        uIntensity: { value: intensity },
        uShineSize: { value: shineSize },
        uShineFade: { value: shineFade },
        uThickness: { value: thickness },
        uLineColor: { value: rgb },
        uTime: { value: 0 },
        uFollowMouse: { value: followMouse },
        uAutoAnimate: { value: autoAnimate },
        uSpeed: { value: speed }
      }
    });

    programRef.current = program;
    const mesh = new Mesh(gl, { geometry, program });

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setSize(rect.width * dpr, rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      program.uniforms.uResolution.value = [rect.width * dpr, rect.height * dpr];
      program.uniforms.uRadius.value = radius * dpr;
      program.uniforms.uThickness.value = thickness * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let startTime = performance.now();
    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      // Smooth mouse lerp
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.15;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.15;

      program.uniforms.uTime.value = elapsed;
      program.uniforms.uMouse.value = [mouseRef.current.x * dpr, mouseRef.current.y * dpr];

      renderer.render({ scene: mesh });
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [radius, intensity, shineSize, shineFade, thickness, lineColor, followMouse, autoAnimate, speed]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = rect.height - (e.clientY - rect.top); // WebGL Y is inverted

    // Check proximity
    const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
    const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= proximity) {
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      mouseRef.current.active = true;
    }
  }, [proximity]);

  useEffect(() => {
    if (!followMouse) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [followMouse, handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className={`specular-button-container ${className}`}
      style={{
        '--sb-radius': `${radius}px`,
        ...style
      }}
      onClick={onClick}
      {...props}
    >
      <button
        type="button"
        className={`specular-button ${size}`}
        style={{
          backgroundColor: baseColor,
          color: textColor,
          backdropFilter: blur ? `blur(${blur}px)` : undefined,
          WebkitBackdropFilter: blur ? `blur(${blur}px)` : undefined
        }}
      >
        <div
          className="specular-button-tint"
          style={{
            backgroundColor: tint,
            opacity: tintOpacity
          }}
        />
        <canvas ref={canvasRef} className="specular-button-canvas" />
        <span className="specular-button-content">
          {children}
        </span>
      </button>
    </div>
  );
}
