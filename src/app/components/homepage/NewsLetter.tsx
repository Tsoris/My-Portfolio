import React from 'react'

function NewsLetter() {
  return (
    <section className='py-20 bg-white dark:bg-dark/50 rounded-lg shadow-md overflown-hidden animate-slide-up'>
        <div className='p-8 md:p-12'>
            <div className='max-w-7xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap items-center'>
                <div>
                    <h2 className='text-2xl font-bold mb-4'>Subscribe to My Newsletter</h2>
                    <p className='text-gray-600 dark:text-gray-300 md:w-2/3'>Get the latest updates on my project, blog posts, and tech insights delievered straight to your inbox</p>
                </div>
                <form className='flex flex-col md:flex-row gap-4'>
                    <input type="email" placeholder="Enter your email" 
                    className="flex-1 px-4 py-3 border rounded-lg dark:text-white border-gray-300 dark:border-gray-600 bg-white text-gray-500 dark:bg-dark 
                    focus:outline-none focus:ring-2 focus:ring-primary"/>
                    
                    <button type='submit' className='bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors'>
                    Subscribe</button>
                </form>
            </div>
            </div>
        </div>
    </section>
  )
}

export default NewsLetter