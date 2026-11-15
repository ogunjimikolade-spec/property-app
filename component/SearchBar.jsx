
import Property from '@/models/Property'
import React from 'react'
import PropertySearchForm from './PropertySearchForm'

const SearchBar = () => {
  return (
       <section className="bg-blue-700 py-4">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start"
      >
        {/* <!-- Form Component --> */}
     <PropertySearchForm />
      </div>
    </section>
  )
}

export default SearchBar