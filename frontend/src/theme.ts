import { createSystem, defaultConfig, defineRecipe } from '@chakra-ui/react'

const colors = {
  colors: {
    purple: {value : '#bd93f9'},
    cyan: {value : '#0bceceff'},
    white: {value : '#f8f8f2'},
    gray : {value : '#646464ff'},
    dark_gray : {value : '#383737ff'},
    bg: {value : '#181818ff'},
    black : {value : '#000000ff'}
  },
}

const fonts = {
  heading: { value : `'Fira Code', monospace`},
  body: {value : `'Fira Code', monospace`},
}

const headingRecipe = defineRecipe({
  base: {
    fontWeight: "normal",
    textStyle: "4xl",
    color: "colors.purple", 
    },
})


const theme = createSystem( defaultConfig, {
        theme: {
            tokens:{
                colors, 
                fonts,
            },
            recipes: { heading: headingRecipe},
        }
    }
)
export default theme
