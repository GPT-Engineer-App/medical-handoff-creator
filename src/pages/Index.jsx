import React, { useState } from "react";
import { Container, VStack, Heading, Input, Button, List, ListItem, ListIcon, FormControl, FormLabel, Textarea, Box } from "@chakra-ui/react";
import { FaPlusCircle, FaUserMd, FaFilePdf } from "react-icons/fa";

const Index = () => {
  const [patients, setPatients] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [summary, setSummary] = useState("");
  const [exam, setExam] = useState("");
  const [todos, setTodos] = useState("");

  const handleAddPatient = () => {
    if (patientName && summary && exam && todos) {
      const newPatient = {
        id: patients.length + 1,
        name: patientName,
        summary: summary,
        exam: exam,
        todos: todos,
      };
      setPatients([...patients, newPatient]);
      setPatientName("");
      setSummary("");
      setExam("");
      setTodos("");
    }
  };

  const handleExportPatients = () => {
    let dataString = "Patient Name, Summary, Exam/Studies, To Dos\n";
    patients.forEach((patient) => {
      dataString += `${patient.name}, ${patient.summary}, ${patient.exam}, ${patient.todos}\n`;
    });
    const element = document.createElement("a");
    const file = new Blob([dataString], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "PatientsData.txt";
    document.body.appendChild(element);
    element.click();
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
            <FormLabel>Patient Summary</FormLabel>
            <Textarea placeholder="Enter patient summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
            <FormLabel mt={4}>Exam/Studies</FormLabel>
            <Textarea placeholder="Enter exam/studies details" value={exam} onChange={(e) => setExam(e.target.value)} />
            <FormLabel mt={4}>To Dos</FormLabel>
            <Textarea placeholder="Enter to dos" value={todos} onChange={(e) => setTodos(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaPlusCircle />} colorScheme="blue" mt={4} onClick={handleAddPatient}>
            Add Patient
          </Button>
          <Button leftIcon={<FaFilePdf />} colorScheme="red" mt={4} onClick={handleExportPatients}>
            Export as PDF
          </Button>
        </Box>
        <List spacing={3} w="100%" borderWidth="1px" borderRadius="lg" p={4}>
          {patients.map((patient) => (
            <ListItem key={patient.id}>
              <ListIcon as={FaUserMd} color="green.500" />
              <tr>
                <td>{patient.name}</td>
                <td>{patient.summary}</td>
                <td>{patient.exam}</td>
                <td>{patient.todos}</td>
              </tr>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
