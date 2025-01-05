import React from 'react'

interface EditProductProps {
   params: {
      slug: string
   }
}

const EditProduct = ({ params }: EditProductProps) => {
  return (
    <div>
      {params.slug}
    </div>
  )
}

export default EditProduct