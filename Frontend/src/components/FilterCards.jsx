import React from 'react'
import { RadioGroup } from './ui/radio-group'
import { Label } from './ui/label'
import { RadioGroupItem } from './ui/radio-group'


const filterData = [
  {
    filterType: "Industry",
    array: ["Delhi NCR", "Bangalore", "Pune", "Hyderabad", "Mumbai"]
  },
  {
    filterType: "Location",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40K", "42-11lakh", "1lakh to 5lakh"]
  }
]

function FilterCards() {
  return (
    <div className="w-full bg-white rounded-md p-4">
      <h1 className="font-bold text-lg mb-3">Filter Jobs</h1>
      <hr className="mb-4" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h1 className="font-bold text-md mb-2">{data.filterType}</h1>
            {data.array.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={item} id={`radio-${data.filterType}-${idx}`} />
                <Label htmlFor={`radio-${data.filterType}-${idx}`}>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCards
