
function ListingPage({ params }: { params: { listingId: string } }) {
  return (
    <div>Listing id: {params.listingId}</div>
  )
}

export default ListingPage