export const CLOUDINARY_ASSETS = {
  logo: 'https://res.cloudinary.com/dz5h75un2/image/upload/v1780993361/logo_tscyne.png',
  about: 'https://res.cloudinary.com/dz5h75un2/image/upload/v1780993375/about_xq6qja.jpg',
  hero1: 'https://res.cloudinary.com/dz5h75un2/image/upload/v1780993533/hero1_clahzh.jpg',
  hero2: 'https://res.cloudinary.com/dz5h75un2/image/upload/v1780993534/hero2_fbqst2.jpg',
  hero3: 'https://res.cloudinary.com/dz5h75un2/image/upload/v1780993534/hero3_ebj36t.jpg',
  hero4: 'https://res.cloudinary.com/dz5h75un2/image/upload/v1780993532/hero4_b356w1.jpg',
  news1: 'https://res.cloudinary.com/dz5h75un2/image/upload/v1780993457/news1_hyespo.jpg',
  news2: 'https://res.cloudinary.com/dz5h75un2/image/upload/v1780993444/news2_cmwhfq.png',
  news3: 'https://res.cloudinary.com/dz5h75un2/image/upload/v1780993448/news3_t1wop0.jpg',
  news4: 'https://res.cloudinary.com/dz5h75un2/image/upload/v1780993447/news4_rlxg47.jpg',
  news5: 'https://res.cloudinary.com/dz5h75un2/image/upload/v1780993448/news5_yy9dpq.png',
}

export function resolveAssetUrl(path) {
  if (!path) return path
  if (/^(https?:)?\/\//.test(path)) return path
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`
}
