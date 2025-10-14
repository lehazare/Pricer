import { Box, VStack, Text, Spinner, Image } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";

const MotionImage = motion.create(Image);

type Croquette = {
    id: number;
    x: number;
    y: number;
    angle: number;
    dx: number;
    dy: number;
};

export default function WorkInProgress() {
    const [croquettes, setCroquettes] = useState<Croquette[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const angle = Math.random() * 360;
        const dx = (Math.random() - 0.5) * 100;
        const dy = (Math.random() - 0.5) * 100;

        const newCroquette: Croquette = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
            angle,
            dx,
            dy,
        };

        setCroquettes((prev) => [...prev, newCroquette]);

        setTimeout(() => {
            setCroquettes((prev) => prev.filter((c) => c.id !== newCroquette.id));
        }, 2000);
    };

    return (
        <Box
            bg="gray.900"
            color="white"
            minH="80vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={6}
            onClick={handleClick}
            cursor="pointer"
            position="relative"
            overflow="hidden"
        >
            <VStack gap={6} textAlign="center">
                <Text fontSize="3xl" fontWeight="bold" color="cyan.300">
                    🚧 Work in Progress 🚧
                </Text>
                <Text fontSize="lg" maxW="850px" whiteSpace="pre-line">
                    My cat is currently working hard on this page.{"\n"}
                    Please be patient, it will be available soon, as long as he has kibble!{"\n"}
                    While waiting, you can feed him by clicking anywhere to drop some kibble 🐾.
                </Text>
                <Image
                    src="/fun/catworking.gif"
                    alt="Cute cat working"
                    borderRadius="lg"
                    boxSize="250px"
                    objectFit="cover"
                />
                <Spinner size="xl" borderWidth="4px" animationDuration="0.4s" color="cyan.300" />

                {croquettes.map((c) => (
                    <MotionImage
                        key={c.id}
                        src="/fun/cat-food.png"
                        boxSize="40px"
                        position="absolute"
                        left={c.x}
                        top={c.y}
                        initial={{ scale: 0, rotate: 0, x: "-170%", y: "-300%" }}
                        animate={{
                            scale: [0, 1.2, 1],
                            rotate: c.angle,
                            x: `calc(-50% + ${c.dx}px)`,
                            y: `calc(-50% + ${c.dy}px)`,
                            opacity: [1, 1, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </VStack>
        </Box>
    );
}