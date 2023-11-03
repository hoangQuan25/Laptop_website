"use client";
import React from 'react'
import { FacebookProvider, CustomChat } from 'react-facebook'

const FacebookMsg = () => {
    return (
        <FacebookProvider appId="2115688285433540" chatSupport>
            <CustomChat pageId="177827672070008" minimized={false} />
        </FacebookProvider>
    )
}

export default FacebookMsg