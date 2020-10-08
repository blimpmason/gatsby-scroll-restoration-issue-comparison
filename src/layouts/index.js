/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { SwitchTransition, Transition } from "react-transition-group"

import Header from "../components/header"

import "./layout.css"

const TRANSITION_DURATION = 400
const TRANSITION_STYLES = {
  default: {
    opacity: 1,
    transition: `all ${TRANSITION_DURATION}ms ease-out`
  },
  entering: {
    opacity: 0
  },
  entered: {
    opacity: 1
  },
  exiting: {
    opacity: 0,
    transition: `all ${TRANSITION_DURATION}ms ease-in`
  },
  exited: {
    opacity: 0
  }
}

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`
        }}
      >
        <SwitchTransition>
          <Transition
            key={location.pathname}
            mountOnEnter
            unmountOnExit
            timeout={TRANSITION_DURATION}
          >
            {status => (
              <div
                style={{
                  ...TRANSITION_STYLES.default,
                  ...TRANSITION_STYLES[status]
                }}
              >
                <main>{children}</main>
                <footer
                  style={{
                    marginTop: `2rem`
                  }}
                >
                  © {new Date().getFullYear()}, Built with
                  {` `}
                  <a href="https://www.gatsbyjs.com">Gatsby</a>
                </footer>
              </div>
            )}
          </Transition>
        </SwitchTransition>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
