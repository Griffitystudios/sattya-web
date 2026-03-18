import React from 'react'
import { Hero } from '../../components/ui/Hero'
import { spottedConfig } from '../../configs/spotted/spotted-hero'
import NoFrillSection from '../../components/sections/spotted/noFrillSection'
import SpottedSection from '../../components/sections/spotted/SpottedSection'
import { newsletterConfig } from '../../configs/spotted/configs/newsletter'
import NewsletterSection from '../../components/ui/NewsletterSection'
function SpottedPage() {
    return (
        <>
            <Hero {...spottedConfig} />
            <NoFrillSection />
            <SpottedSection />
            <NewsletterSection {...newsletterConfig} />
        </>
    )
}

export default SpottedPage
