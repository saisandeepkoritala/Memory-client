import React, { useState } from 'react';

const Textarea = ({Message,SetMessage}) => {

    const handleChangeMessage = (event) => {
        const inputValue = event.target.value;

        // Check if number of characters exceeds 250
        if (inputValue.length <= 250) {
            SetMessage(inputValue);
        }
    };

    return (
        <>
            <textarea
                value={Message}
                onChange={handleChangeMessage}
                rows={4}
                placeholder='Message'
                className='message'
            />
            <p>{(Message.length < 250) ? `${Message.length} of 250 characters` : `Message length of 250 characters Exceeded`}</p>

        </>
    );
};

export default Textarea;
