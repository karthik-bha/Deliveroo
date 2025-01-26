import React from 'react'

const Usage = () => {
    return (
        <div className='font-[Outfit] my-6 min-h-[80vh] max-w-[60vw] mx-auto flex items-center justify-center'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-[1.5rem] font-bold'>Steps to use this application</h2>
                <p>Use these if you do not want to create a new account</p>
                <ul className='px-4'>
                    <div className='flex gap-2'>
                        <b>Credentials:</b>
                        <li>test@gmail.com</li>
                    </div>
                    <div className='flex gap-2'>
                        <b>Password:</b>
                        <li>test@123</li>
                    </div>
                    <div className='flex gap-2'>
                        <b>Note:</b>
                        <li>You cannot place orders if you do not log in.</li>

                    </div>
                </ul>
                <b className='my-2'>For ordering you can use the following: </b>
                <ul >
                    <div className='flex gap-2'>
                        <b>Card number: </b>
                        <li>4242 4242 4242 4242.</li>
                    </div>
                    <div className='flex gap-2'>
                        <b>CVC/CARDHOLDER NAME/EMAIL: </b>
                        <li>Anything.</li>
                    </div>
                    <div className='flex gap-2'>
                        <b>EXPIRY: </b>
                        <li>Any future month and year.</li>
                    </div>
                </ul>

                <p>Admin panel is present, but users are not allowed access due to concern
                    of database tampering.</p>
                <b>Overview of the admin panel</b>
                <ul className="px-2">
                    <li>Add food items, upload food images, title, description and price.</li>
                    <li>Delete food items</li>
                    <li>Delete orders and update order status</li>
                </ul>
                <p>If you'd like to view the code for admin panel, visit the github repository below: </p>
                <p><b>GitHub: </b> <a href="https://github.com/karthik-bha/Deliveroo" target='_blank' className='hover:font-semibold'> Click here </a></p>

            </div>
        </div>
    )
}

export default Usage