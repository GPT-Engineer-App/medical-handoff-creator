import React, { useState } from "react";
import { Container, VStack, Heading, Input, Button, List, ListItem, ListIcon, FormControl, FormLabel, Textarea, Box } from "@chakra-ui/react";
import { FaPlusCircle, FaUserMd } from "react-icons/fa";

const Index = () => {
  const [patients, setPatients] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [details, setDetails] = useState("");

  const handleAddPatient = () => {
    if (patientName && details) {
      const newPatient = {
        id: patients.length + 1,
        name: patientName,
        details: details,
      };
      setPatients([...patients, newPatient]);
      setPatientName("");
      setDetails("");
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>Rounding List Creator</Heading>
        <Box w="100%">
          <FormControl>
            <FormLabel>Patient Name</FormLabel>
            <Input placeholder="Enter patient's name" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Details</FormLabel>
            <Textarea placeholder="Enter details about the patient" value={details} onChange={(e) => setDetails(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaPlusCircle />} colorScheme="blue" mt={4} onClick={handleAddPatient}>
            Add Patient
          </Button>
        </Box>
        <List spacing={3} w="100%" borderWidth="1px" borderRadius="lg" p={4}>
          {patients.map((patient) => (
            <ListItem key={patient.id}>
              <ListIcon as={FaUserMd} color="green.500" />
              <strong>{patient.name}</strong> - {patient.details}
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
