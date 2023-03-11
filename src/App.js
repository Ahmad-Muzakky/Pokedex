import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Text,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import Modals from "./component/modals/modal";
import axios from "axios";

function App() {
  const [whichPage,setWhichPage] = useState("home");
const [whichModal, setWhichModal] = useState("home");

  //firstpage function
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getPokemon = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
      setPokemon(res.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const catchPokemon = async (name,img) => {
    const data = {
      name : name,
      image_id : img
    }
    try {
      const res = await axios.post(`http://localhost:4000/pokemon/catch`,data);
      alert(res.data.result);
      if(res.data.is_catch == 1){
        myPokemon.push({
          name : res.data.name,
          image_id : res.data.image_id,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getPokemon();
  }, []);

  //second page function
  const [myPokemon,setMyPokemon] = useState([]);

  return (
    <>
      <div className="container">
        <Box as="section" pb={{ base: "12", md: "24" }}>
          <Box as="nav" bg="bg-surface" boxShadow="sm">
            <Container py={{ base: "4", lg: "5" }}>
              <HStack spacing="10" justify="space-between">
                <Flex justify="space-between" flex="1">
                  <ButtonGroup variant="link" spacing="8">
                    <Button
                      onClick={async () => {
                        setWhichPage("home");
                      }}
                    >
                      Pokemon Index
                    </Button>
                    <Button
                      onClick={async () => {
                        setWhichPage("mypokemon");
                        console.log(myPokemon);
                      }}
                    >
                      My Pokemon List
                    </Button>
                  </ButtonGroup>
                </Flex>
              </HStack>
            </Container>
          </Box>
        </Box>
        {whichPage === "home" ? (
          <div>
            {loading ? (
              <div></div>
            ) : (
              <div>
                <Modals
                  id={selected}
                  isOpen={isOpen}
                  onClose={onClose}
                  whichModal={whichModal}
                />
                <Center>
                  <Text fontSize={"6xl"} as="b">
                    Pokemon Index - HomePage
                  </Text>
                </Center>
                <div className="grid">
                  {pokemon.map((data, index) => (
                    <div className="grid-item">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                          index + 1
                        }.png`}
                        alt="404 not found"
                      />
                      <p>{data.name}</p>
                      <Flex>
                        <Button
                          colorScheme="blue"
                          onClick={async (e) => {
                            setWhichModal("detail");
                            setSelected(index + 1);
                            onOpen(e);
                          }}
                        >
                          Lihat Detail
                        </Button>
                        <Button
                          colorScheme="green"
                          mr={3}
                          ml={28}
                          onClick={async (e) => {
                            catchPokemon(data.name, index + 1);
                          }}
                        >
                          Catch
                        </Button>
                      </Flex>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Center>
              <Text fontSize={"6xl"} as="b">
                My Pokemon List
              </Text>
            </Center>
            {myPokemon.length == 0 ? (
              <div>
                <Center>
                  <Text fontSize={"xl"} color="red">
                    Catch Your Pokemon First
                  </Text>
                </Center>
                =
              </div>
            ) : (
              <div>
                <Modals
                  id={selected}
                  isOpen={isOpen}
                  onClose={onClose}
                  whichModal={whichModal}
                />
                <div className="grid">
                  {myPokemon.map((data, index) => (
                    <div className="grid-item">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.image_id}.png`}
                        alt="404 not found"
                      />
                      <p>{data.name}</p>
                      <Button
                        colorScheme="red"
                        onClick={async (e) => {
                          setWhichModal("release");
                          onOpen(e);
                        }}
                      >
                        Release
                      </Button>
                      <Button
                        ml={28}
                        colorScheme="blue"
                        onClick={async (e) => {
                          setWhichModal("rename");
                          onOpen(e);
                        }}
                      >
                        Rename
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
