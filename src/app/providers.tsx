'use client';

import { ConvexReactClient} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth, ClerkProvider} from "@clerk/nextjs";

const client= new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({children}: {children: React.ReactNode}) {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={client} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}