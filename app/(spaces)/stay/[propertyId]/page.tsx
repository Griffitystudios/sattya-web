// app/stay/[propertyId]/page.tsx
import PropertyBooking from "../../../../components/sections/stay/PropertyBooking";
import { properties } from "../../../../configs/stay/properties";

export default async function PropertyPage({
    params,
}: {
    params: Promise<{ propertyId: string }>;
}) {
    const { propertyId } = await params;
    const property = properties[propertyId];

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="p text-black/50">Property not found: <strong>{propertyId}</strong></p>
            </div>
        );
    }

    return <PropertyBooking {...property} />;
}