import { HStack, Box, Button, Menu, Portal, useDisclosure, IconButton, Drawer, VStack, Text } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { navItems } from "../config/Routes";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";


const isActive = (path: string, to: string) => {
  if (to === "/") {
    return path === "/";
  }
  return path.startsWith(to);
};

const Navbar = () => {
  const location = useLocation()
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
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
        <HStack
          gap={8}
          display={{ base: "none", md: "flex" }}
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
                            _hover={{ color: "colors.purple", bgColor: 'colors.dark_gray' }}
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

        <IconButton
          aria-label="Open menu"
          display={{ base: "flex", md: "none" }}
          onClick={open ? onClose : onOpen}
          color="colors.white"
          bg="transparent"
          _hover={{ bg: "transparent", color: "colors.purple" }}
        >
          {open ? <MdClose /> : <GiHamburgerMenu />}
        </IconButton>
      </HStack>

      <Drawer.Root open={open} onOpenChange={open ? onClose : onOpen} placement={"top"} size={"full"}>
        <Drawer.Trigger asChild>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner paddingTop={20}>
            <Drawer.Content bg={"colors.bg"}>
              <Drawer.Body>
                <VStack gap={3} p={4}>
                  {navItems.map((item, i) => (
                    <Box key={i} w="100%">
                      {item.children ? (
                        <Box>
                          <VStack align="center" padding={30} gap={30}>
                            <Text fontWeight="bold" color={"colors.purple"} fontSize="lg" mb={2}>
                              {item.label}
                            </Text>
                          </VStack>
                          <VStack align="center" gap={5}>
                            {item.children.map((child, j) => (
                              <Link key={j} to={child.to} onClick={open ? onClose : onOpen}>
                                <Text fontSize="md" color={"colors.cyan"}>
                                  {child.label}
                                </Text>
                              </Link>
                            ))}
                          </VStack>
                        </Box>
                      ) : (
                        <VStack align="center" paddingTop={30} gap={2}>
                          <Link to={item.to} onClick={open ? onClose : onOpen}>
                            <Text fontWeight="bold" color={"colors.purple"} fontSize="lg" _hover={{ color: "blue.400" }}>
                              {item.label}
                            </Text>
                          </Link>
                        </VStack>
                      )}
                    </Box>
                  ))}
                </VStack>
              </Drawer.Body>
              <Drawer.Footer>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

    </>
  )
}

export default Navbar
