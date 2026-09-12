import { motion } from 'framer-motion'

/**
 * Custom Animated Food Visualizers using Framer Motion
 * Different tailored, interactive animations for every food category and dish type.
 */
export default function FoodAnimation({ category = 'Snacks', name = '', isHovered = false }) {
  const cat = category.toLowerCase()
  const lowerName = name.toLowerCase()

  if (cat.includes('beverage') || lowerName.includes('chai') || lowerName.includes('coffee') || lowerName.includes('soda')) {
    return <BeverageAnimation isHot={lowerName.includes('chai') || lowerName.includes('coffee') || lowerName.includes('tea')} isHovered={isHovered} />
  }

  if (cat.includes('south') || lowerName.includes('dosa') || lowerName.includes('idli')) {
    return <SouthIndianAnimation isHovered={isHovered} />
  }

  if (cat.includes('north') || lowerName.includes('thali') || lowerName.includes('dal') || lowerName.includes('paneer') || lowerName.includes('chole')) {
    return <CurryThaliAnimation isHovered={isHovered} />
  }

  if (cat.includes('chinese') || lowerName.includes('noodle') || lowerName.includes('manchurian') || lowerName.includes('rice')) {
    return <ChineseWokAnimation isHovered={isHovered} />
  }

  if (cat.includes('healthy') || lowerName.includes('salad') || lowerName.includes('sprout')) {
    return <HealthySaladAnimation isHovered={isHovered} />
  }

  if (cat.includes('dessert') || lowerName.includes('jamun') || lowerName.includes('halwa')) {
    return <DessertSweetAnimation isHovered={isHovered} />
  }

  if (cat.includes('combo')) {
    return <ComboBentoAnimation isHovered={isHovered} />
  }

  // Default Snacks & Bites
  return <SnackCrispAnimation isHovered={isHovered} />
}

/** 1. Beverage Animation: Undulating Liquid Wave + Bubbles or Steam */
function BeverageAnimation({ isHot, isHovered }) {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      {/* Cup base */}
      <motion.div
        animate={isHovered ? { rotate: [-2, 2, -2] } : {}}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="relative w-8 h-8 rounded-b-xl rounded-t-sm bg-gradient-to-b from-amber-600/20 to-amber-700/40 dark:from-amber-400/20 dark:to-amber-500/30 border border-amber-600/40 dark:border-amber-400/40 flex items-center justify-center overflow-hidden"
      >
        {/* Liquid Surface */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute bottom-0 inset-x-0 h-5 bg-amber-600/50 dark:bg-amber-500/50 rounded-b-lg"
        />

        {/* Effervescent Rising Bubbles */}
        {!isHot && (
          <>
            <motion.div
              animate={{ y: [6, -8], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, delay: 0.2 }}
              className="absolute w-1 h-1 rounded-full bg-white/80 left-2 bottom-1"
            />
            <motion.div
              animate={{ y: [6, -8], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}
              className="absolute w-1.5 h-1.5 rounded-full bg-white/80 right-2.5 bottom-1"
            />
          </>
        )}
      </motion.div>

      {/* Steam lines if hot */}
      {isHot && (
        <div className="absolute -top-1 inset-x-0 flex justify-center gap-1">
          <motion.div
            animate={{ y: [-1, -6], opacity: [0, 0.8, 0], scaleX: [0.8, 1.2] }}
            transition={{ repeat: Infinity, duration: 1.8, delay: 0 }}
            className="w-[1.5px] h-3 bg-gray-400 dark:bg-gray-200 rounded-full"
          />
          <motion.div
            animate={{ y: [-1, -8], opacity: [0, 0.9, 0], scaleX: [1, 1.3] }}
            transition={{ repeat: Infinity, duration: 2.2, delay: 0.5 }}
            className="w-[1.5px] h-3.5 bg-gray-400 dark:bg-gray-200 rounded-full"
          />
        </div>
      )}
    </div>
  )
}

/** 2. South Indian: Sizzling Pan Plate + Golden Ring Pulse */
function SouthIndianAnimation({ isHovered }) {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      {/* Outer Glow Ring */}
      <motion.div
        animate={isHovered ? { scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] } : { scale: 1, opacity: 0.2 }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 rounded-full bg-amber-400/30 blur-sm pointer-events-none"
      />

      {/* Plate */}
      <motion.div
        animate={isHovered ? { rotate: [0, 360] } : {}}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
        className="w-8 h-8 rounded-full border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 flex items-center justify-center"
      >
        {/* Golden Rolled Dosa Shape */}
        <motion.div
          animate={{ scaleX: [0.9, 1.05, 0.9] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="w-6 h-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-full shadow-sm"
        />
      </motion.div>

      {/* Sizzle Steam */}
      <motion.div
        animate={{ y: [-2, -7], opacity: [0, 0.8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute -top-1 w-1 h-1 rounded-full bg-amber-400/60"
      />
    </div>
  )
}

/** 3. North Indian / Thali: Simmering Bowl with Vapor Swirl */
function CurryThaliAnimation({ isHovered }) {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      {/* Bowl */}
      <motion.div
        animate={isHovered ? { y: [-1, 1, -1] } : {}}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/20 to-red-600/30 dark:from-orange-400/20 dark:to-red-500/30 border border-orange-500/40 dark:border-orange-400/30 flex items-center justify-center"
      >
        {/* Simmering spice center */}
        <motion.div
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 shadow-inner"
        />
      </motion.div>

      {/* Swirling Aroma Vapor */}
      <motion.div
        animate={{ rotate: 360, opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-orange-400/40 pointer-events-none"
      />
    </div>
  )
}

/** 4. Chinese / Wok: Toss Motion & Herb Flakes */
function ChineseWokAnimation({ isHovered }) {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      {/* Wok Base */}
      <motion.div
        animate={isHovered ? { rotate: [-8, 8, -8] } : { rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        className="w-8 h-4 rounded-b-full bg-gray-800 dark:bg-gray-200 border-t border-gray-600 dark:border-gray-400 flex items-center justify-center relative overflow-visible"
      >
        {/* Tossed Noodles/Veggies Floating Up */}
        <motion.div
          animate={{ y: [-1, -6, -1], rotate: [0, 45, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="absolute -top-2 w-4 h-1 bg-amber-400 rounded-full"
        />
        <motion.div
          animate={{ y: [-1, -8, -1], rotate: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }}
          className="absolute -top-2.5 w-2 h-1 bg-emerald-400 rounded-full"
        />
      </motion.div>
    </div>
  )
}

/** 5. Healthy Salad: Fluttering Herb Leaf & Fresh Dew */
function HealthySaladAnimation({ isHovered }) {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <motion.div
        animate={isHovered ? { rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] } : { rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center relative"
      >
        {/* Central Fresh Leaf */}
        <motion.div
          animate={{ scaleY: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-3.5 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-tr-xl rounded-bl-xl transform -rotate-12 shadow-sm"
        />

        {/* Small floating crisp particle */}
        <motion.div
          animate={{ y: [-1, -4, -1], opacity: [0.2, 0.9, 0.2] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
          className="absolute top-1 right-2 w-1 h-1 bg-emerald-400 rounded-full"
        />
      </motion.div>
    </div>
  )
}

/** 6. Dessert / Sweet: Glaze Shimmer & Sparkle */
function DessertSweetAnimation({ isHovered }) {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <motion.div
        animate={isHovered ? { scale: [1, 1.12, 1] } : { scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-700 via-amber-600 to-yellow-500 shadow-md relative flex items-center justify-center"
      >
        {/* Shimmer Highlight */}
        <motion.div
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-2 h-2 rounded-full bg-white/70 absolute top-1.5 left-1.5"
        />
      </motion.div>

      {/* Sparkle burst */}
      <motion.div
        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
        className="absolute -top-1 -right-1 w-2 h-2 text-amber-400 font-bold text-xs"
      >
        ✦
      </motion.div>
    </div>
  )
}

/** 7. Combo / Bento: Modular Layer Snap */
function ComboBentoAnimation({ isHovered }) {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <motion.div
        animate={isHovered ? { rotate: [0, 4, -4, 0] } : {}}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="w-8 h-8 rounded-xl border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/5 p-1 grid grid-cols-2 gap-0.5"
      >
        <motion.div
          animate={{ scale: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.1 }}
          className="rounded-sm bg-orange-500/80"
        />
        <motion.div
          animate={{ scale: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
          className="rounded-sm bg-amber-400/80"
        />
        <motion.div
          animate={{ scale: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          className="rounded-sm bg-emerald-500/80"
        />
        <motion.div
          animate={{ scale: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.7 }}
          className="rounded-sm bg-gray-400/80 dark:bg-white/60"
        />
      </motion.div>
    </div>
  )
}

/** 8. Snack: Crispy Bounce & Steam */
function SnackCrispAnimation({ isHovered }) {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <motion.div
        animate={isHovered ? { y: [-2, 2, -2], rotate: [-4, 4, -4] } : { y: [-1, 1, -1] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="w-7 h-7 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 shadow-sm flex items-center justify-center transform rotate-45"
      >
        <div className="w-3 h-3 bg-amber-400 rounded-sm transform -rotate-45" />
      </motion.div>
    </div>
  )
}
