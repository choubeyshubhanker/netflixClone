"use client"
import React from 'react'
import { RecoilRoot } from 'recoil'

export interface Props  { 
    children: React.ReactNode
 }


const StateProvider = ({children}:Props) => {
  return (
    <RecoilRoot> {children} </RecoilRoot>
  )
}

export default StateProvider