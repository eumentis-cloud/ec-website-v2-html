import React from "react";
import {useStaticQuery, graphql} from 'gatsby';
import GatsbyImage from "gatsby-image";
import {FluidImageType} from "../utils/types";

type ClientLogoProps = {
    clientLogo: string;
    imgAltText: string;
}

// FC
const ClientLogo: React.FC<ClientLogoProps> = ({clientLogo, imgAltText}) => {

    const {allFile}: FluidImageType = useStaticQuery(graphql`
        query {
            allFile(filter: {extension: {regex: "/(jpg)|(png)|(jpeg)/"}, absolutePath: {regex: "/clients/"}}) {
                edges {
                    node {
                        id
                        base
                        childImageSharp {
                            fluid {
                                aspectRatio
                                base64
                                sizes
                                src
                                srcSet
                            }
                        }
                    }
                }
            }
        }
    `)


    return (
        <>
            {
                allFile.edges.filter((imgData) => {
                    return imgData.node.base === clientLogo;
                }).map((imgData) => (
                    <GatsbyImage  style={{height: '7rem', width: 100}} imgStyle={{height: clientLogo === 'bizminder.png' || clientLogo === 'nutritoo.png' ? '4.5rem' : '6.5rem'}} className="mr-3 img-fluid align-self-center project-details-client-logo" alt={imgAltText} fluid={imgData.node.childImageSharp.fluid} />
                ))
            }
        </>
    )
}

export default ClientLogo;