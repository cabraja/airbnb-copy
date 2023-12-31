import prisma from '@/app/libs/prismadb'

interface IParams{
    listingId?:string;
}

export default async function getListingById(params:IParams){
    try {
        const {listingId} = params;

        const listing = await prisma.listing.findUnique({
            where:{
                id: listingId
            },
            include:{
                User:true
            }
        })

        if(!listing) return null;

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            User: {
                ...listing.User,
                createdAt: listing.User.createdAt.toISOString(),
                updatedAt: listing.User.updatedAt.toISOString(),
                emailVerified: listing.User.updatedAt?.toISOString() || null
            }
        }

    } catch (error:any) {
        throw new Error(error);
    }
}