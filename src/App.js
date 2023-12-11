import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { getRefreshToken, setRefreshToken, setToken } from './api/token';
import { getadmin } from './api/data';
import { ThemeProvider, createTheme } from '@mui/material/styles';


import Nav from './components/nav';
import AddUser from './pages/addUser';
import CreateNewFlow from './pages/createNewFlow';
import Flows from './pages/flows';
import Login from './pages/login';
import Register from './pages/register';
import Apriori from './operations/apriori/apriori';
import ApResult from './operations/apriori/apResult';
import Home from './pages/home';
import api from './api/api';
import Manage_Company from './pages/Manage_Company';
import EditUser from './pages/editUser';
import MapComp from './components/map';
import { Companymain } from './pages/companymain';
import { GeoloctionMain } from './operations/geolocation/geoloctionMain';
import { GeolocationResult, geolocationResult } from './operations/geolocation/geolocationResult';
import { AddDataSet } from './pages/addDataSet';
import EditDeataSet from './pages/EditDataSet';
import { TeamForUser } from './pages/teamForUser';
import { ShowHTML } from './pages/showHTML';
import { ViewOldApFlow } from './operations/apriori/viewOldApFlow';
import { ViewOldGeoLocationFlow } from './operations/geolocation/viewOldGeoLocationFlow';
import { ApUpdate } from './operations/apriori/apUpdate';
import { GeolocationEditInfo } from './operations/geolocation/geolocationEditInfo';
import { GeoUpdate } from './operations/geolocation/geoUpdate';
import { CassificationMain } from './operations/classification/cassificationMain';
import { ClassificationResult } from './operations/classification/classificationResult';
import { ClassificationModelUse } from './operations/classification/classificationModelUse';
import { ClassificationOldFlow } from './operations/classification/classificationOldFlow';
import { RegressionMain } from './operations/regrssion/regressionMain';
import { RegressionResult } from './operations/regrssion/regressionResult';
import { RegressionModelUse } from './operations/regrssion/regressionModelUse';
import { RegressionOldFlow } from './operations/regrssion/regressionOldFlow';
import { ChatWithAI } from './operations/ChatGPT/chatWithAI';
import { ChatGPTMain } from './operations/ChatGPT/chatGPTMain';
import { AnomalyMain } from './operations/anomaly/anomalyMain';
import { AnomalyResult } from './operations/anomaly/anomalyResult';
import { AnomalyModelUse } from './operations/anomaly/anomalyModelUse';
import { AnomalyOldFlow } from './operations/anomaly/anomalyOldFlow';
import { SentimentMain } from './operations/sentiment/sentimentMain';
import { SentimentResult } from './operations/sentiment/sentimentResult';
import { SentimentOld } from './operations/sentiment/sentimentOld';
import { ClusteringModelUse } from './operations/clustering/clusteringModelUse';
import { ClusteringOldFlow } from './operations/clustering/clusteringOldFlow';
import { ClusteringResult } from './operations/clustering/clusteringResult';
import { ClusteringMain } from './operations/clustering/clusteringMain';
import { TimeMain } from './operations/timeSeries/timeMain';
import { TimeResult } from './operations/timeSeries/timeResult';
import { TimeOld } from './operations/timeSeries/timeOld';



function App() {
  var admin = getadmin() === 'true'

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Quicksand',
      },
    },
  })

  useEffect(() => {
    // console.log('in app js')
    // console.log(getadmin())
    // console.log(getRefreshToken())
    if (getRefreshToken() != null) {
      axios
        .post("http://127.0.0.1:8000/api/auth/token/refresh/", { refresh: getRefreshToken() })
        .then((res) => {
          // console.log(res);
          setToken(res.data.access);
          setRefreshToken(res.data.refresh);
        })
        .catch((err) => {
          console.log(err);
        });

    }
  }, [])


  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="App h-full dark:bg-[#f5f5f5] font-body scroll-smooth">

          <Nav />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Flows" element={<Flows />} />
            <Route path="/CreateNewFlow" element={<CreateNewFlow />} />
            <Route path="/Add_DataSet" element={<AddDataSet />} />
            <Route path="/EditDeataSet" element={<EditDeataSet />} />
            <Route path="/Team" element={<TeamForUser />} />


            <Route path="/AddUser" element={admin ? <AddUser /> : <>why are you here</>} />
            <Route path="/EditUser/:id/edit" element={admin ? <EditUser /> : <>why are you here</>} />
            {/* <Route path="/AddUser" element={<AddUser />} /> */}

            <Route path="/Employes" element={admin ? <Manage_Company /> : <>why are you here</>} />

            {/* Apriori */}
            <Route path="/Apriori" element={<Apriori />} />
            <Route path="/ApResult" element={<ApResult />} />
            <Route path="/ApUpdate/:Flowid/:DataSetid" element={<ApUpdate />} />
            <Route path="/old/frequentItemSet/:id" element={<ViewOldApFlow />} />


            <Route path="/map" element={<MapComp />} />

            {/* Company  */}
            <Route path="/Company" element={<Companymain />} />

            {/* Geolocation */}
            <Route path="/Geolocation" element={<GeoloctionMain />} />
            <Route path="/Geolocation_Result" element={<GeolocationResult />} />
            <Route path="/old/geolocation/:id" element={<ViewOldGeoLocationFlow />} />
            <Route path="/GeolocationUpdata/:Flowid/:DataSetid" element={<GeoUpdate />} />

            {/* Classification */}
            <Route path="/Cassification" element={<CassificationMain />} />
            <Route path="/Cassification_Result" element={<ClassificationResult />} />
            <Route path="/Cassification_USE_Model/:id" element={<ClassificationModelUse />} />
            <Route path="/old/classification/:id" element={<ClassificationOldFlow />} />

            {/* Classification */}
            <Route path="/Regression" element={<RegressionMain />} />
            <Route path="/Regression_Result" element={<RegressionResult />} />
            <Route path="/Regression_USE_Model/:id" element={<RegressionModelUse />} />
            <Route path="/old/regression/:id" element={<RegressionOldFlow />} />

            {/* ChatGPT */}
            <Route path="/ChatWithAI/:id" element={<ChatWithAI />} />
            <Route path="/ChatMain" element={<ChatGPTMain />} />

            {/* Anomaly */}
            <Route path="/AnomalyMain" element={<AnomalyMain />} />
            <Route path="/Anomaly_Result" element={<AnomalyResult />} />
            <Route path="/Anomaly_USE_Model/:id" element={<AnomalyModelUse />} />
            <Route path="/old/Anomaly/:id" element={<AnomalyOldFlow />} />


            {/* Sentiment */}
            <Route path="/Sentiment" element={<SentimentMain />} />
            <Route path="/SentimentResult" element={<SentimentResult />} />
            <Route path="/old/Sentiment/:id" element={<SentimentOld />} />

            {/* Anomaly */}
            <Route path="/ClusteringMain" element={<ClusteringMain />} />
            <Route path="/Clustering_Result" element={<ClusteringResult />} />
            <Route path="/Clustering_USE_Model/:id" element={<ClusteringModelUse />} />
            <Route path="/old/Clustering/:id" element={<ClusteringOldFlow />} />

            {/* Sentiment */}
            <Route path="/Time_Series" element={<TimeMain />} />
            <Route path="/Time_Result" element={<TimeResult />} />
            <Route path="/old/timeSeries/:id" element={<TimeOld />} />


          </Routes>

        </div>


      </ThemeProvider>
      {/* <Routes>
        <Route path="/ShowHTML" element={<ShowHTML />} />
      </Routes> */}
    </>
  );
}

export default App;
