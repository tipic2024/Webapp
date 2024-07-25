import { CFormInput, CFormLabel } from '@coreui/react'
import React, { useState } from 'react'

//Months function 
export function Months() {

const [state,setState]=useState("");
  return (
    <div className="col-sm-4">
                  <div className="mb-1">
                    <CFormLabel htmlFor="end_date">Start  Date</CFormLabel>
                    <CFormInput
                      type="month"
                      id="end_date"
                      name="end_date"
                      
                      // onChange={handleChange}
                      required
                      feedbackInvalid="Please select date."
                    />
                  </div>
                </div>
  )
}

//Quarters function
export function Quarter() {

  return (
    <div>
      
    </div>
  )
}
 
import React from 'react'

export function Year() {
  return (
    <div>
      
    </div>
  )
}

import React from 'react'

export  function Custom() {
  return (
    <div>
      
    </div>
  )
}

import React from 'react'

export  function week() {
  return (
    <div>
      
    </div>
  )
}


