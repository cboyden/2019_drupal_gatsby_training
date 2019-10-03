import React from "react"
import {graphql} from "gatsby"
//import { Link } from "gatsby"

import Layout from "../components/layout"
//import Image from "../components/image"
import SEO from "../components/seo"
import RecipeTeaser from "../components/recipe-teaser.js"

const RecipeListingPage = ({ data }) => (
  <Layout>
    <SEO title="Recipes" />
    <h1>Hi people, here are the recipes</h1>
    { data.allNodeRecipe.edges.map((recipe) => (
    <RecipeTeaser
    key={recipe.node.id}
    recipeDate={recipe.node.created}
    recipeTitle={recipe.node.title}
    recipeSummary={recipe.node.field_summary.value}
    recipeImg={recipe.node.relationships.field_image.localFile.childImageSharp.fixed}
    imgAlt={recipe.node.field_image.alt}
    recipeSlug={recipe.node.fields.slug}
    />
)) }
  </Layout>
)

export const query = graphql`
 query RecipeQuery {
  allNodeRecipe {
    edges {
      node {
        id
        title
        created(formatString: "MMMM Do, YYYY")
        field_summary {
          value
        }
        field_image {
          alt
        }
        fields {
          slug
        }
        relationships {
          field_image {
            localFile {
              childImageSharp {
                fixed(width: 125, height: 125) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export default RecipeListingPage
