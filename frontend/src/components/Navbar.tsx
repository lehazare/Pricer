import { HStack, Box, Button, Menu, Portal } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { navItems } from "../config/Routes"; 

const isActive = (path: string, to: string) => {
  if (to === "/") {
    return path === "/";
  }
  return path.startsWith(to);
};

const Navbar = () => {
  const location = useLocation()

  return (
    <HStack
      as="nav"
      px={8}
      py={4}
      gap={100}
      bg="colors.bg"
      borderBottom="1px solid"
      borderColor="colors.gray"
      justify="center"
    >
      {navItems.map(({ label, to, children }) => (
        <Box key={label}>
          {children ? (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button
                  variant="ghost"
                  color={isActive(location.pathname, to) ? "colors.purple" : "colors.white"}
                  _hover={{ color: "colors.purple" }}
                  size="sm"
                >
                  {label}
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content bg="colors.gray" borderColor="colors.gray">
                    {children.map(({ label: subLabel, to: subTo }) => (
                      <Menu.Item
                        key={subLabel}
                        asChild
                        value={subTo}
                        color={"colors.white"}
                        _hover={{ color: "colors.purple", bgColor:'colors.dark_gray'}}
                      >
                          <Link to={subTo}>{subLabel}</Link> 
                      </Menu.Item>
                    ))}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          ) : (
            <Button
              variant="ghost"
              color={isActive(location.pathname, to) ? "colors.purple" : "white"}
              _hover={{ color: "colors.purple" }}
              size="sm"
            >
                <Link to={to}>{label}</Link> 
            </Button>)}
        </Box>
      ))}
    </HStack>
  )
}

export default Navbar
