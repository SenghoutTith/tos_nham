import React from 'react'
import facebook from "../assets/facebook.png"
import instagram from "../assets/instagram.png"
import tiktok from "../assets/tik-tok.png"
import twitter from "../assets/twitter.png"
import youtube from "../assets/youtube.png"
import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
const Footer = () => {

    const footerLink = [
      {
          id: 1,
          title: "Address",
          subtitle: "Phnom Penh #1, Street 96 Sangkat Wat Phnom Khan Daun Penh, Phnom Penh",
          href: null,
      },
      {
          id: 2,
          title: "Phone",
          subtitle: "+855 168 168 168",
          href: null,
      },
      {
          id: 3,
          title: "Email",
          subtitle: "tosnham123@gmail.com",
          href: "mailto:tosnham123@gmail.com",
      },
  ]

  const footerLink2 = [
      {
          id: 1,
          icons: youtube,
          title: "Youtube",
          href: "https://www.youtube.com",
      },
      {
          id: 2,
          icons: facebook,
          title: "Facebook",
          href: "https://wwww.facebook.com",
      },
      {
          id: 3,
          icons: instagram,
          title: "Instagram",
          href: "https://www.instagram.com",
      },
      {
          id: 4,
          icons: twitter,
          title: "Twitter",
          href: "https://www.twitter.com",
      },
      {
          id: 5,
          icons: tiktok,
          title: "TikTok",
          href: "https://www.tiktok.com",
      },
  ]

  return (
    <div className="sticky left-0 -bottom-full z-10 w-full h-fit bg-purple-950">
            <div className="flex justify-between p-2 sm:p-4">
                <div className="flex flex-col sm:flex-row gap-2">
                    <img className="w-36 sm:w-40 sm:h-40" src={logo} alt="logo" />
                    <div className="flex flex-col max-w-[200px] min-w-[150px] sm:max-w-[250px] justify-between">
                        <p className="text-purple-400 capitalize text-xl font-bold">get in touch</p>
                        {footerLink.map(({id, title, subtitle, href}) => (
                                <p key={id} className="drop-shadow-2xl text-purple-600 text-sm font-bold">{title}: <Link 
                                to={href} className="text-xs text-purple-200">{subtitle}</Link></p>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col w-fit  justify-evenly sm:justify-between">
                        <p className="text-purple-400 capitalize text-xl font-bold">follow us</p>
                        {footerLink2.map(({id, icons, title, href}) => (
                            <Link target="_blank" key={id} to={href}>
                                <div className="flex items-center sm:gap-2">
                                    <img className="w-5 h-5" src={icons} alt="" />
                                    <p className="text-xs sm:text-base drop-shadow-2xl text-purple-200 font-bold">{title}</p>
                                </div>
 
                            </Link> 

                        ))}
                    </div>
            </div>
        </div>
  )
}

export default Footer