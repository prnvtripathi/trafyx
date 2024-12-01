import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://apilux.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://apilux.vercel.app/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        }, {
            url: 'https://apilux.vercel.app/login',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        }, {
            url: 'https://apilux.vercel.app/signup',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://apilux.vercel.app/docs',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}