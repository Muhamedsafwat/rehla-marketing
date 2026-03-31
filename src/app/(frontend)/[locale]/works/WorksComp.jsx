import React from 'react'
import Works from './_components/Works'
import getWorks from '../_actions/GetWorks'

const WorksComp = async () => {
  const works = await getWorks()
  return (
    <div>
      <Works works={works} />
    </div>
  )
}

export default WorksComp
