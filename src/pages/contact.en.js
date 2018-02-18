import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import Helmet from 'react-helmet'
import LazyLoad from 'react-lazyload'
import styled from "styled-components";
import GoogleMap from 'google-map-react'

//components
import Header from '../components/Header'
import Footer from '../components/Footer'
import TitleBox from '../components/TitleBox'
import ContactForm from '../components/ContactForm'
import Headline from '../components/Headline'
import Card from '../components/Card'



class Contact extends React.Component {

    render() {

        const { data } = this.props
        const metadata = data.site.siteMetadata
        const page = data.markdownRemark
        const loc = {
            center: {lat: page.frontmatter.location.lat, lng: page.frontmatter.location.lng},
            zoom: 15
          };
        const bg = page.frontmatter.cover == null ? "" : page.frontmatter.cover.childImageSharp.resize.src
        const Cover = styled.div`
                background-image: url(${bg});
        `;

        //fetch info
        const infolist = [];
        page.frontmatter.info.forEach(info => {
            infolist.push(
              <Card 
              color= "purple"
              image= {info.icon}
              image_type= "icon"
              header= {<h4>{info.title_en}</h4>}
              text= {<p>{info.content_en}</p>}
              />
            )
          }
        )

        return (
            <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{metadata.title_en} | {page.frontmatter.title_en}</title>
            </Helmet>
            <div className="content">
            <Header
            language="العربية"
            />
            <div className="container-fluid">
            <TitleBox
            pageTitle= {page.frontmatter.page_title_en}
            pageSubtitle={page.frontmatter.subtitle_en}
            pageDescription={page.frontmatter.description_en}
             />
            <div className="row">
                <div className="col-sm">
                    <div className="page">

                        <div className="map">
                        <GoogleMap
                        bootstrapURLKeys={{ key: ['AIzaSyA6GNEZY4PxhcDWj4uN-1oR9_-CzJ5BMKc']}}
                        defaultCenter= {loc.center}
                        defaultZoom= {loc.zoom}
                        >
                            <span className="typcn typcn-location map-target"
                            lat={loc.center.lat}
                            lng={loc.center.lng}
                            ></span>
                        </GoogleMap>
                        </div>
                        
                        <div className="page-content">
                            <div className="row">
                                <div className="col">
                                <h1 className="headline">Cotact Form</h1>
                                    <ContactForm 
                                    sendTo={page.frontmatter.email}
                                    emailLabel="Email"
                                    emailPlaceholder="Example@domain.com"
                                    nameLabel="Name"
                                    namePlaceholder="Your Name"
                                    messageLabel="Message"
                                    messagePlaceholder="I would like to know more about TEAMX"
                                    buttonText="Send"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="page-content">
                                    <Headline title={page.frontmatter.info_title_en}/>
                                    <div className="card-deck">
                                        {infolist}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
          </div>
        <Footer 
        lang="en"
        />
        </div>
        <div id="bg"></div>
            </div>
        )
    }
}

export default Contact

export const contactQuery = graphql`
    query ContactQuer {
        site{
            siteMetadata{
            title_en
            }
        }
        markdownRemark(frontmatter:{slug: {eq:"contact"}}){
            frontmatter {
            title_en
            page_title_en
            subtitle_en
            description_en
            email
            info_title_en
            location {
                lat
                lng
            }
            cover {
                childImageSharp {
                    resize (width: 1920){
                        src
                    }
                }
            }
            info {
                title_en
                icon 
                content_en
            }
        }
        }
    }
`