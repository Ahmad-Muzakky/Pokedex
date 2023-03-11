import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Input,
} from "@chakra-ui/react";

export default function Modals ({id, isOpen, onClose, whichModal}){
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState();
    const [name, setName] = useState();

    const handleChangeName = (e) => {
      setName(e.target.value);
    };

    const handleSubmitName = async (e) => {
      e.preventDefault();
    };

    const handleChangeRelease=(e) =>{
      setNumber(e.target.value);
    }

    const handleSubmitRelease = async(e) =>{
      e.preventDefault();
      try {
        const res = await axios.get(`http://localhost:4000/pokemon/release/${number}`);
        alert(res.data)
      } catch (error) {
        console.log(error.message);
      }
    }

    const getPokemon = async (id) => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };

    useEffect(() => {
      getPokemon(id);
    }, [id]);
    
    return (
      <>
        {loading ? (
          <div></div>
        ) : (
          <div>
            {whichModal === "detail" ? (
              <div>
                <Modal id={id} isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent maxH="800px" maxW="800px">
                    <ModalHeader>Detail Pokemon</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Flex>
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                          alt="404 not found"
                        />
                        <div>
                          <p>Name : {pokemon.name}</p>
                          <p>Height : {pokemon.height}</p>
                          <p>Weight :{pokemon.weight}</p>
                          <br />
                          <p>Types</p>
                          {pokemon.types.map((data) => (
                            <p>- {data.type.name}</p>
                          ))}
                          <br />
                          <h1>Moves</h1>
                          {pokemon.moves.map(
                            (data, index) =>
                              index < 5 && <p>- {data.move.name}</p>
                          )}
                        </div>
                      </Flex>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </div>
            ) : whichModal === "rename" ? (
              <Modal id={id} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxH="800px" maxW="800px">
                  <ModalHeader>Name Your Pokemon</ModalHeader>
                  <ModalCloseButton />
                  <form onSubmit={handleSubmitName}>
                    <ModalBody>
                      <Flex>
                        <Input
                          type="text"
                          placeholder="Input Pokemon's Name"
                          size="lg"
                          name="name"
                          id="name"
                          onChange={handleChangeName}
                        />
                      </Flex>
                    </ModalBody>
                    <ModalFooter>
                      <Button type="submit" colorScheme="blue" mr={3}>
                        Submit
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>
            ) : whichModal === "release" ? (
              <Modal id={id} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxH="800px" maxW="800px">
                  <ModalHeader>Release Pokemon</ModalHeader>
                  <ModalCloseButton />
                  <form onSubmit={handleSubmitRelease}>
                    <ModalBody>
                      <Flex>
                        <Input
                          type="number"
                          placeholder="Input Any Number"
                          size="lg"
                          name="number"
                          id="number"
                          onChange={handleChangeRelease}
                        />
                      </Flex>
                    </ModalBody>
                    <ModalFooter>
                      <Button type="submit" colorScheme="blue" mr={3}>
                        Release
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </>
    );
}