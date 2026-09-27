// lib/data.ts
import { WigProduct } from '@/types';

export const wigProducts: WigProduct[] = [
  // ================= 9x6 GLUELESS =================
  {
    id: '9x6-glueless',
    name: '9x6 Glueless Wig',
    category: '9x6-glueless',
    description: 'Premium 9x6 glueless lace front. No glue needed — beginner friendly.',
    featured: true,
    ranges: [
      {
        label: '10 - 14',
        sizes: [10, 12, 14],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/9x6glueless-14-black.png', prices: { 10: 850, 12: 950, 14: 1050 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/9x6glueless-12-burgundy.png', prices: { 10: 850, 12: 950, 14: 1050 } },
          { name: '613 Blonde', code: 'blonde', image: '/images/wigs/9x6glueless-12-blonde.png', prices: { 10: 850, 12: 950, 14: 1050 } },
          { name: '4/27 Highlight', code: 'highlight', image: '/images/wigs/9x6glueless-12-highlight.png', prices: { 10: 850, 12: 950, 14: 1050 } },
        ],
      },
      {
        label: '16 - 22',
        sizes: [16, 18, 20, 22],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/9x6glueless-22-black.png', prices: { 16: 1250, 18: 1500, 20: 1700, 22: 2050 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/9x6glueless-22-burgundy.png', prices: { 16: 1250, 18: 1500, 20: 1700, 22: 2050 } },
          { name: '613 Blonde', code: 'blonde', image: '/images/wigs/9x6glueless-18-blonde.png', prices: { 16: 1250, 18: 1500, 20: 1700, 22: 2050 } },
          { name: '4/27 Highlight', code: 'highlight', image: '/images/wigs/9x6glueless-18-highlight.png', prices: { 16: 1250, 18: 1500, 20: 1700, 22: 2050 } },
        ],
      },
      {
        label: '24 - 30',
        sizes: [24, 26, 28, 30],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/9x6glueless-30-black.png', prices: { 24: 2450, 26: 2950, 28: 3450, 30: 3950 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/9x6glueless-28-burgundy.png', prices: { 24: 2450, 26: 2950, 28: 3450, 30: 3950 } },
          { name: '613 Blonde', code: 'blonde', image: '/images/wigs/9x6glueless-30-blonde.png', prices: { 24: 2450, 26: 2950, 28: 3450, 30: 3950 } },
          { name: '4/27 Highlight', code: 'highlight', image: '/images/wigs/9x6glueless-30-highlight.png', prices: { 24: 2450, 26: 2950, 28: 3450, 30: 3950 } },
        ],
      },
    ],
  },

  // ================= STRAIGHT =================
  {
    id: 'straight',
    name: 'Straight Wig',
    category: 'straight',
    description: 'Bone straight premium wig. Sleek, smooth, glass-like finish.',
    featured: false,
    ranges: [
      {
        label: '10 - 14',
        sizes: [10, 12, 14],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/straight-14-black.png', prices: { 10: 700, 12: 780, 14: 900 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/straight-12-burgundy.png', prices: { 10: 700, 12: 780, 14: 900 } },
          { name: '613 Blonde', code: 'blonde', image: '/images/wigs/straight-10-blonde.png', prices: { 10: 700, 12: 780, 14: 900 } },
        ],
      },
      {
        label: '16 - 20',
        sizes: [16, 18, 20],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/straight-18-black.png', prices: { 16: 1100, 18: 1200, 20: 1350 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/straight-18-burgundy.png', prices: { 16: 1100, 18: 1200, 20: 1350 } },
          { name: '613 Blonde', code: 'blonde', image: '/images/wigs/straight-18-blonde.png', prices: { 16: 1100, 18: 1200, 20: 1350 } },
        ],
      },
      {
        label: '22 - 24',
        sizes: [22, 24],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/straight-22-black.png', prices: { 22: 1600, 24: 1900 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/straight-22-burgundy.png', prices: { 22: 1600, 24: 1900 } },
          { name: '613 Blonde', code: 'blonde', image: '/images/wigs/straight-22-blonde.png', prices: { 22: 1600, 24: 1900 } },
        ],
      },
    ],
  },

  // ================= CURLS =================
  {
    id: 'curls',
    name: 'Curly Wig',
    category: 'curls',
    description: 'Lush body wave curls. Voluminous, vibrant, effortlessly glamorous.',
    featured: false,
    ranges: [
      {
        label: '10 - 14',
        sizes: [10, 12, 14],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/curly-10-black.png', prices: { 10: 800, 12: 880, 14: 1000 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/curly-10-burgundy.png', prices: { 10: 800, 12: 880, 14: 1000 } },
          { name: '613 Blonde', code: 'blonde', image: '/images/wigs/curly-10-blonde.png', prices: { 10: 800, 12: 880, 14: 1000 } },
        ],
      },
      {
        label: '16 - 20',
        sizes: [16, 18, 20],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/curly-18-black.png', prices: { 16: 1200, 18: 1300, 20: 1450 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/curly-18-burgundy.png', prices: { 16: 1200, 18: 1300, 20: 1450 } },
          { name: '613 Blonde', code: 'blonde', image: '/images/wigs/curly-18-blonde.png', prices: { 16: 1200, 18: 1300, 20: 1450 } },
        ],
      },
      {
        label: '22 - 24',
        sizes: [22, 24],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/curly-22-black.png', prices: { 22: 1700, 24: 2000 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/curly-22-burgundy.png', prices: { 22: 1700, 24: 2000 } },
          { name: '613 Blonde', code: 'blonde', image: '/images/wigs/curly-22-blonde.png', prices: { 22: 1700, 24: 2000 } },
        ],
      },
    ],
  },

  // ================= BOB =================
  {
    id: 'bob',
    name: 'Bobo Wig',
    category: 'bobo',
    description: 'Classic short bob. Sleek, chic, effortlessly stylish.',
    featured: true,
    ranges: [
      {
        label: '8 - 16',
        sizes: [8, 10, 12, 14, 16],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/bob-14-black.png', prices: { 8: 500, 10: 550, 12: 600, 14: 750, 16: 850 } },
          { name: '350 Ginger', code: 'ginger', image: '/images/wigs/bob-14-ginger.png', prices: { 8: 550, 10: 600, 12: 650, 14: 800, 16: 900 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/bob-14-burgundy.png', prices: { 8: 550, 10: 600, 12: 650, 14: 800, 16: 900 } },
          { name: '4/27 Highlight', code: 'highlight', image: '/images/wigs/bob-14-highlight.png', prices: { 8: 600, 10: 650, 12: 700, 14: 850, 16: 950 } },
        ],
      },
    ],
  },

  // ================= DOUBLE DRAWN =================
  {
    id: 'double-drawn',
    name: 'Double Drawn Wig',
    category: 'double-drawn',
    description: 'Thick from weft to end. The premium standard in luxury wigs.',
    featured: true,
    ranges: [
      {
        label: '10 - 14',
        sizes: [10, 12, 14],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/doubledrawn-14-black.png', prices: { 10: 750, 12: 850, 14: 950 } },
          { name: '4# Dark Brown', code: 'darkbrown', image: '/images/wigs/doubledrawn-14-darkbrown.png', prices: { 10: 800, 12: 900, 14: 1000 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/doubledrawn-14-burgundy.png', prices: { 10: 800, 12: 900, 14: 1000 } },
          { name: '613 Blonde', code: 'blonde', image: '/images/wigs/doubledrawn-14-blonde.png', prices: { 10: 900, 12: 1050, 14: 1150 } },
          { name: 'Grey', code: 'grey', image: '/images/wigs/doubledrawn-14-grey.png', prices: { 10: 900, 12: 1050, 14: 1150 } },
          { name: 'Red', code: 'red', image: '/images/wigs/doubledrawn-14-red.png', prices: { 10: 900, 12: 1050, 14: 1150 } },
        ],
      },
      {
        label: '16 - 22',
        sizes: [16, 18, 20, 22],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/doubledrawn-20-black.png', prices: { 16: 1150, 18: 1400, 20: 1600, 22: 1950 } },
          { name: '4# Dark Brown', code: 'darkbrown', image: '/images/wigs/doubledrawn-18-darkbrown.png', prices: { 16: 1200, 18: 1450, 20: 1650, 22: 2000 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/doubledrawn-18-burgundy.png', prices: { 16: 1200, 18: 1450, 20: 1650, 22: 2000 } },
          { name: '613 Blonde', code: 'blonde', image: '/images/wigs/doubledrawn-18-blonde.png', prices: { 16: 1300, 18: 1600, 20: 1800, 22: 2100 } },
          { name: 'Grey', code: 'grey', image: '/images/wigs/doubledrawn-18-grey.png', prices: { 16: 1300, 18: 1600, 20: 1800, 22: 2100 } },
          { name: 'Red', code: 'red', image: '/images/wigs/doubledrawn-18-red.png', prices: { 16: 1300, 18: 1600, 20: 1800, 22: 2100 } },
        ],
      },
      {
        label: '24 - 30',
        sizes: [24, 26, 28, 30],
        colors: [
          { name: 'Natural Black', code: 'black', image: '/images/wigs/doubledrawn-30-black.png', prices: { 24: 2350, 26: 2850, 28: 3350, 30: 3850 } },
          { name: '4# Dark Brown', code: 'darkbrown', image: '/images/wigs/doubledrawn-30-darkbrown.png', prices: { 24: 2400, 26: 2900, 28: 3400, 30: 3900 } },
          { name: '99J Burgundy', code: 'burgundy', image: '/images/wigs/doubledrawn-30-burgundy.png', prices: { 24: 2400, 26: 2900, 28: 3400, 30: 3900 } },
          { name: '613 Blonde', code: 'blonde', image: '/images/wigs/doubledrawn-30-blonde.png', prices: { 24: 2500, 26: 3000, 28: 3500, 30: 4000 } },
          { name: 'Grey', code: 'grey', image: '/images/wigs/doubledrawn-30-grey.png', prices: { 24: 2500, 26: 3000, 28: 3500, 30: 4000 } },
          { name: 'Red', code: 'red', image: '/images/wigs/doubledrawn-30-red.png', prices: { 24: 2500, 26: 3000, 28: 3500, 30: 4000 } },
        ],
      },
    ],
  },
];