import farmImage from '../assets/farm.png'
import milkImage from '../assets/milk.png'
import curdImage from '../assets/curd.webp'
import paneerImage from '../assets/paneer.webp'
import gheeImage from '../assets/ghee.avif'
import butterImage from '../assets/butter.webp'
import buttermilkImage from '../assets/buttermilk.avif'
import lassiImage from '../assets/Lassi.avif'

export { farmImage, milkImage }

export const company = {
  name: 'PureDairy',
  phone: '+91 80012 34567',
  phoneHref: 'tel:+918001234567',
  email: 'hello@puredairy.in',
  emailHref: 'mailto:hello@puredairy.in',
  whatsappNumber: '918001234567',
  addressLines: ['28 Fresh Fields Road, Green Park', 'Bengaluru, Karnataka 560001'],
  businessHours: ['Monday – Saturday: 7:00 AM – 7:00 PM', 'Sunday: 8:00 AM – 1:00 PM'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=28%20Fresh%20Fields%20Road%2C%20Green%20Park%2C%20Bengaluru%2C%20Karnataka%20560001',
}

export function getWhatsAppUrl(productName = '') {
  const subject = productName ? ` about ${productName}` : ''
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(`Hello ${company.name}, I would like to enquire${subject}.`)}`
}

export const benefits = [['Fresh & Pure','Untouched by hands'],['Quality Tested','75+ checks daily'],['Farm Fresh Milk','Direct from source'],['Trusted by Families','Since 2004']]
export const products = [
  ['Fresh Milk', 'Creamy, naturally wholesome milk delivered fresh.', 'Daily essential', milkImage],
  ['Curd', 'Thick, creamy curd cultured with care.', 'Naturally set', curdImage],
  ['Paneer', 'Soft, rich paneer for everyday favourites.', 'High protein', paneerImage],
  ['Ghee', 'Aromatic, golden ghee made from pure butter.', 'Traditional goodness', gheeImage],
  ['Butter', 'Smooth, delicious butter for every table.', 'Rich & creamy', butterImage],
  ['Buttermilk', 'A cool, lightly spiced summer refresher.', 'Light & refreshing', buttermilkImage],
  ['Lassi', 'A classic creamy drink made from fresh curd.', 'Made daily', lassiImage],
  ['Flavoured Milk', 'A tasty treat with the goodness of milk.', 'Family favourite', milkImage],
]
export const quality = [['Hygienic Processing','Our modern dairy follows carefully controlled, clean processing practices.'],['Quality Testing','Every batch passes through rigorous checks before it reaches your home.'],['Fresh Sourcing','We work with responsible local farms and collect milk every day.'],['Safe Packaging','Food-grade sealed packs protect freshness and preserve natural taste.'],['Cold-Chain Freshness','Temperature-controlled handling keeps every product at its best.']]
export const reasons = [['Freshness','Delivered close to collection for a naturally fresh experience.'],['Nutrition','Wholesome dairy goodness for growing families and busy days.'],['Quality','Consistent standards at every step, from farm to pack.'],['Hygiene','Clean facilities, trained teams and carefully sealed products.'],['Reliable Delivery','On-time service you can comfortably count on.'],['Customer Trust','A dairy partner loved by families for over two decades.']]
export const testimonials = [['“The milk tastes wonderfully fresh, and the delivery is always dependable. It has become part of our daily routine.”','Meera Shah','Home Chef, Bengaluru'],['“I trust PureDairy for my children. The quality is consistent and the paneer is beautifully soft.”','Aarav Mehta','Parent, Pune'],['“From curd to ghee, the products remind me of the wholesome dairy we grew up with.”','Nisha Kapoor','Customer since 2012']]