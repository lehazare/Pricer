import { Route, Routes } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import { navItems } from './config/Routes'

function App() {
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Box p={8} flex="1" bg="colors.bg">
        <Routes>
          {navItems.map(item => (
            <Route key={item.to} path={item.to} element={item.component} />
          ))}
          {navItems.flatMap(item =>
            item.children?.map(child => (
              <Route key={child.to} path={child.to} element={child.component} />
            )) || []
          )}
        </Routes>
      </Box>
    </Flex>
  )
}

export default App