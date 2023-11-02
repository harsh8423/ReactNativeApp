import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeBanner from "../components/HomeBanner";
import HomeButtons from "../components/HomeButton";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../navigator/TopBar";
import ContextApi from '../components/ContextApi';

export default function UserPage() {
  const a = useContext(ContextApi);
  const id = a?.user?._id;
  const navigation = useNavigation();

  const [projects, setProjects] = useState([]);
  const [filterpage, setFilterPage] = useState(false);
  const [descriptionStyle, setDescriptionStyle] = useState({
    maxHeight: 50,
    overflow: "hidden",
  });

  const handleStyle = () => {
    if (descriptionStyle.maxHeight === 50) {
      setDescriptionStyle({ maxHeight: "auto", overflow: "visible" });
    } else {
      setDescriptionStyle({ maxHeight: 50, overflow: "hidden" });
    }
  };

  useEffect(() => {
    contract();
  }, []);

  const contract = async () => {
    const response = await fetch(
      "https://helping-hands-api.vercel.app/api/contracts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json.success) {
      const data = json.data;
      setProjects(data);
    }
  };

  const ProjectProposal = (id) => {
    navigation.navigate("Apply", { state: id });
  };

  // Code to filter
  const query = {};

  const handleProposalType = (e) => {
    query.proposalType = e.target.value;
    handleFilter();
  };

  const handleProjectType = (e) => {
    query.projectType = e.target.value;
    handleFilter();
  };

  const handleBudget = (e) => {
    query.budget = e.target.value;
    handleFilter();
  };

  const handleExpLevel = (e) => {
    query.expLevel = e.target.value;
    handleFilter();
  };

  const handleProjctLength = (e) => {
    query.projctLength = e.target.value;
    handleFilter();
  };

  const handleFilter = async () => {
    const response = await fetch(
      "https://helping-hands-api.vercel.app/api/filterProject",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      const data = json.data;
      setProjects(data);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TopBar/>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <HomeBanner />
            </View>
            <View style={{ flex: 1 }}>
              <HomeButtons />
            </View>
            {!filterpage ? (
              <View style={{ flex: 1, padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Projects you might like
                </Text>
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => {
                    setFilterPage(true);
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Apply Filters &gt;&gt;
                  </Text>
                </TouchableOpacity>
                {projects.map((project) => {
                  const skilled = project.skills;
                  const creater = project.creater;
                  if (creater) {
                    return (
                      <View
                        key={project._id}
                        style={{
                          padding: 10,
                          borderBottomWidth: 2,
                          borderBottomColor: "grey",
                        }}
                      >
                        <View style={{margin:10}}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                          {project.title}
                        </Text>

                        <Text
                          style={{
                            position: "absolute",
                            right: 0,
                            padding: 6,
                            borderRadius:10,
                            backgroundColor:
                              project.proposalType === "Team" ? "red" : "green",
                            color: "white",
                          }}
                        >
                          {project.proposalType}
                        </Text>
                        </View>

                        <Text style={{ fontWeight: "bold", color: "grey" }}>
                          Experience Level: {project.expLevel} | Credits:{" "}
                          {project.budget} | Est. Duration:{" "}
                          {project.projectDuration}
                        </Text>
                        <Text
                          numberOfLines={3}
                          ellipsizeMode="tail"
                          style={{ maxHeight: descriptionStyle.maxHeight }}
                        >
                          {project.description}
                        </Text>
                        <Text
                          onPress={handleStyle}
                          style={{
                            color: "blue",
                            textDecorationLine: "underline",
                            cursor: "pointer",
                            marginTop: 5,
                          }}
                        >
                          Read more
                        </Text>
                        <View
                          style={{
                            // display:"flex",
                            margin: 1,

                            width: "auto",
                            borderRadius: 20,
                            flexDirection: "row",
                          }}
                        >
                          {skilled.map((skill) => (
                            <View
                              style={{
                                borderRadius: 20,

                                backgroundColor: "lightgrey",
                                padding: 10,
                                margin: 10,
                              }}
                            >
                              <Text style={{ fontWeight: "bold" }}>
                                {skill}
                              </Text>
                            </View>
                          ))}
                        </View>
                        <Text style={{ fontWeight: "bold", color: "grey" }}>
                          Teammate required: {project.projectType} {"\n"}2 hours
                          ago
                        </Text>

                        
                          <TouchableOpacity
                            onPress={() => ProjectProposal(project._id)}
                            style={{
                              padding: 5,
                              margin:5,
                              width: 100,
                              backgroundColor: "lightgreen",
                              alignItems: "center",
                              fontWeight: "bold",
                              borderRadius: 20,
                            }}
                          >
                            <Text>Apply</Text>
                          </TouchableOpacity>
                      </View>
                    );
                  }
                })}
              </View>
            ) : (
              <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Filters
                </Text>
                <View style={{ marginTop: 10 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={handleProposalType}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingRight: 10,
                      }}
                    >
                      <Text style={styles.labelText}>Only connects</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.labelText}>Project Type:</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={handleProjectType}>
                      <Text style={styles.labelText}>Exchange</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleProjectType}>
                      <Text style={styles.labelText}>Credit based</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.labelText}>Credits:</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={handleBudget}>
                      <Text style={styles.labelText}>{"<"}1000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleBudget}>
                      <Text style={styles.labelText}>1001-5000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleBudget}>
                      <Text style={styles.labelText}>5001-10000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleBudget}>
                      <Text style={styles.labelText}>{">"}10000</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.labelText}>Experience Level:</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={handleExpLevel}>
                      <Text style={styles.labelText}>Beginner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleExpLevel}>
                      <Text style={styles.labelText}>Intermediate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleExpLevel}>
                      <Text style={styles.labelText}>Expert</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.labelText}>Project Length:</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={handleProjctLength}>
                      <Text style={styles.labelText}>Small</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleProjctLength}>
                      <Text style={styles.labelText}>Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleProjctLength}>
                      <Text style={styles.labelText}>Large</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.labelText}>Recruiting:</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={handleProjectType}>
                      <Text style={styles.labelText}>Single</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleProjectType}>
                      <Text style={styles.labelText}>Multiple</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setFilterPage(false);
                  }}
                  style={{
                    padding: 10,
                    borderColor: "black",
                    borderWidth: 3,
                    marginTop: 20,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
    paddingRight: 10,
  },
};
