import dotenv from 'dotenv';;

dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {connectDb} from "./database.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

const sampleProducts = [

    //Furniture
    {
        name : 'Premium Sofa Set (3+1+1)',
        category : 'Furniture',
        description : "Luxurious fabric sofa set with foam cushioning. perfect for living rooms, Includes 3-seater, 1-seater and 1-seater.",
        monthlyRent : 1299,
        deposit : 2500,
        tenureOptions : [3,6,12],
        stock : 10,
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
        brand: 'FurniturePro', rating: 4.6,
    },
    {
        name: 'Queen Size Bed with Orthopedic Mattress',
        category: 'Furniture',
        description: 'Solid sheesham wood queen bed frame with memory foam mattress. Includes under-bed storage drawers. Supports up to 300 kg. Ideal for master bedrooms.',
        monthlyRent: 1099, deposit: 2200, tenureOptions: [3,6,12], stock: 8,
        imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600',
        brand: 'SleepWell', rating: 4.7,
    },
    {
        name: 'Single Bed with Mattress',
        category: 'Furniture',
        description: 'Sturdy single bed with solid wood frame and a comfortable foam mattress. Perfect for kids rooms, guest rooms, or studio apartments. Easy to assemble and disassemble.',
        monthlyRent: 599, deposit: 1200, tenureOptions: [3,6,12], stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600',
        brand: 'SleepWell', rating: 4.3,
    },
    {
        name: 'Dining Table Set — 6 Seater',
        category: 'Furniture',
        description: 'Elegant solid wood dining table with 6 cushioned chairs. Scratch-resistant lacquered top. Seats a family of six comfortably. Perfect for spacious dining rooms.',
        monthlyRent: 899, deposit: 1800, tenureOptions: [3,6,12], stock: 7,
        imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600',
        brand: 'WoodCraft', rating: 4.4,
    },
    {
        name: 'Dining Table Set — 4 Seater',
        category: 'Furniture',
        description: 'Compact 4-seater dining set with a modern walnut-finish top and metal legs. Great for smaller homes and apartments. Comes with 4 padded chairs.',
        monthlyRent: 649, deposit: 1300, tenureOptions: [3,6,12], stock: 12,
        imageUrl: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=600',
        brand: 'WoodCraft', rating: 4.2,
    },
    {
        name: 'Work-From-Home Desk & Chair Combo',
        category: 'Furniture',
        description: 'Ergonomic home office setup with spacious L-shaped desk and high-back mesh chair. Adjustable armrests, lumbar support, and built-in cable management tray.',
        monthlyRent: 699, deposit: 1400, tenureOptions: [3,6,12], stock: 14,
        imageUrl: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600',
        brand: 'WorkSpace', rating: 4.5,
    },
    {
        name: '3-Door Wardrobe with Mirror',
        category: 'Furniture',
        description: 'Spacious 3-door wardrobe with a full-length mirror on the center panel. Features hanging space, multiple shelves, and a small drawer unit. Pre-assembled on delivery.',
        monthlyRent: 699, deposit: 1400, tenureOptions: [3,6,12], stock: 9,
        imageUrl: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600',
        brand: 'StoragePro', rating: 4.3,
    },
    {
        name: '2-Door Compact Wardrobe',
        category: 'Furniture',
        description: 'Slim 2-door wardrobe perfect for studio apartments and small bedrooms. Includes a hanging rod and 3 shelves. Available in white and walnut finish.',
        monthlyRent: 449, deposit: 900, tenureOptions: [3,6,12], stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600',
        brand: 'StoragePro', rating: 4.1,
    },
    {
        name: 'Bookshelf — 5 Tier',
        category: 'Furniture',
        description: 'Modern 5-tier open bookshelf with industrial pipe-and-wood design. Holds up to 25 kg per shelf. Great for books, plants, and decor. Doubles as a room divider.',
        monthlyRent: 349, deposit: 700, tenureOptions: [3,6,12], stock: 20,
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
        brand: 'ModernHome', rating: 4.2,
    },
    {
        name: 'Coffee Table — Glass Top',
        category: 'Furniture',
        description: 'Sleek glass-top coffee table with powder-coated metal frame. Tempered glass surface is safe and easy to clean. Compact size fits perfectly in front of any sofa.',
        monthlyRent: 299, deposit: 600, tenureOptions: [3,6,12], stock: 22,
        imageUrl: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=600',
        brand: 'ModernHome', rating: 4.0,
    },
    {
        name: 'Recliner Sofa Chair',
        category: 'Furniture',
        description: 'Premium single-seater recliner with adjustable backrest and footrest. Upholstered in PU leather for durability. Built-in cup holder and side pocket.',
        monthlyRent: 799, deposit: 1600, tenureOptions: [3,6,12], stock: 6,
        imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600',
        brand: 'ComfortZone', rating: 4.6,
    },
    {
        name: 'TV Unit — Floating Wall Mount',
        category: 'Furniture',
        description: 'Modern floating TV unit with 2 cabinets and open shelves. Fits TVs up to 55 inches. Comes with all mounting hardware. Available in white and oak finish.',
        monthlyRent: 399, deposit: 800, tenureOptions: [3,6,12], stock: 16,
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
        brand: 'ModernHome', rating: 4.2,
    },

    // APPLIANCES
    {
        name: '1.5 Ton 5-Star Split AC',
        category: 'Appliances',
        description: 'Energy-efficient 5-star inverter split AC with auto-clean and anti-bacterial filter. Cools a room up to 150 sq ft in minutes. Free installation and uninstallation included.',
        monthlyRent: 1499, deposit: 3000, tenureOptions: [3,6,12], stock: 6,
        imageUrl: 'https://images.unsplash.com/photo-1631193816258-29b1a3e8e3ea?w=600',
        brand: 'LG', rating: 4.7,
    },
    {
        name: '1 Ton 3-Star Split AC',
        category: 'Appliances',
        description: 'Compact 1-ton split AC ideal for rooms up to 110 sq ft. 3-star energy rating. Auto-restart after power cuts. Suitable for bedrooms. Installation service included.',
        monthlyRent: 999, deposit: 2000, tenureOptions: [3,6,12], stock: 10,
        imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600',
        brand: 'Voltas', rating: 4.3,
    },
    {
        name: '43" 4K Smart Android TV',
        category: 'Appliances',
        description: '43-inch 4K UHD Smart TV with Android and Google Assistant. Supports Netflix, YouTube, Prime Video. 2 HDMI, 2 USB ports. Crystal clear display for an immersive viewing experience.',
        monthlyRent: 899, deposit: 1800, tenureOptions: [3,6,12], stock: 9,
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600',
        brand: 'Sony', rating: 4.6,
    },
    {
        name: '32" Full HD Smart TV',
        category: 'Appliances',
        description: '32-inch Full HD Smart TV with WiFi. Supports all major OTT apps. Perfect for bedrooms and small living rooms. Energy-efficient LED backlight.',
        monthlyRent: 599, deposit: 1200, tenureOptions: [3,6,12], stock: 14,
        imageUrl: 'https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=600',
        brand: 'Samsung', rating: 4.4,
    },
    {
        name: 'Front Load Washing Machine — 7 kg',
        category: 'Appliances',
        description: 'Fully automatic front-load washing machine with 7 kg capacity. 15 wash programs including quick wash and sanitize. In-built heater and energy-efficient inverter motor.',
        monthlyRent: 999, deposit: 2000, tenureOptions: [3,6,12], stock: 5,
        imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600',
        brand: 'Whirlpool', rating: 4.5,
    },
    {
        name: 'Top Load Washing Machine — 6.5 kg',
        category: 'Appliances',
        description: 'Fully automatic top-load washing machine. 6.5 kg capacity, turbo pulsator for deep cleaning, and multiple wash programs. Simple controls ideal for everyday use.',
        monthlyRent: 699, deposit: 1400, tenureOptions: [3,6,12], stock: 8,
        imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600',
        brand: 'Samsung', rating: 4.2,
    },
    {
        name: 'Double Door Refrigerator — 310L',
        category: 'Appliances',
        description: '310-litre double door frost-free refrigerator with inverter compressor. Adjustable shelves, large vegetable crisper, and 4-star energy rating. Ideal for families of 3–4.',
        monthlyRent: 1099, deposit: 2200, tenureOptions: [3,6,12], stock: 7,
        imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600',
        brand: 'Godrej', rating: 4.4,
    },
    {
        name: 'Single Door Refrigerator — 190L',
        category: 'Appliances',
        description: 'Compact 190-litre single door refrigerator for bachelors and small families. Direct cool, large freezer compartment, and 5-star energy rating. Very low power consumption.',
        monthlyRent: 599, deposit: 1200, tenureOptions: [3,6,12], stock: 12,
        imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600',
        brand: 'Haier', rating: 4.1,
    },
    {
        name: 'Convection Microwave Oven — 28L',
        category: 'Appliances',
        description: '28-litre convection microwave with grill and bake functions. 10 auto-cook menus, child lock, and easy-clean stainless steel cavity. Perfect for baking, grilling, and reheating.',
        monthlyRent: 499, deposit: 1000, tenureOptions: [3,6,12], stock: 14,
        imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600',
        brand: 'IFB', rating: 4.3,
    },
    {
        name: 'RO+UV Water Purifier — 8L',
        category: 'Appliances',
        description: '8-stage RO+UV+TDS water purifier. Purifies up to 15 litres/hour with 8L storage. Filter change alerts and auto-shutoff. Suitable for municipal and borewell water.',
        monthlyRent: 349, deposit: 700, tenureOptions: [3,6,12], stock: 20,
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        brand: 'Kent', rating: 4.5,
    },
    {
        name: 'BLDC Ceiling Fan with Remote',
        category: 'Appliances',
        description: 'High-speed BLDC ceiling fan consumes only 35W — saving 60% electricity vs regular fans. Remote control with 5 speed settings, timer, and sleep mode. Whisper-quiet motor.',
        monthlyRent: 249, deposit: 500, tenureOptions: [3,6,12], stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        brand: 'Havells', rating: 4.4,
    },
    {
        name: 'Smart Air Purifier — HEPA Filter',
        category: 'Appliances',
        description: 'Wi-Fi enabled air purifier with 3-stage HEPA filtration. Covers rooms up to 400 sq ft. Real-time AQI display, auto mode, sleep mode, and filter life indicator.',
        monthlyRent: 599, deposit: 1200, tenureOptions: [3,6,12], stock: 10,
        imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600',
        brand: 'Dyson', rating: 4.6,
    },
];

export const seedDB = async () =>{
    try{
        await connectDb();

        await User.deleteMany({});
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing data');

        const salt = await bcrypt.genSalt(10);

        await User.create({
            name: 'Admin User',
            email: 'admin@rentease.com',
            password: 'admin123',
            role: 'admin',

        });

        await User.create({
            name: 'Rahul Sharma',
            email: 'user@rentease.com',
            password: await bcrypt.hash('user123', salt),
            role: 'user',

        });

        await Product.insertMany(sampleProducts);

        console.log(`\n✅ Database seeded successfully!`);
        console.log(`📦 ${sampleProducts.length} products added (${sampleProducts.filter(p=>p.category==='Furniture').length} Furniture, ${sampleProducts.filter(p=>p.category==='Appliances').length} Appliances)`);
        console.log(`\n📧 Admin : admin@rentease.com  |  admin123`);
        console.log(`📧 User  : user@rentease.com   |  user123\n`);
        process.exit(0);

    }catch(error){
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
}

