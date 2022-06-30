import { Row, Col, Button, Card, CardBody, CardHeader } from "reactstrap";
import Topbar from "../Topbar";
import WeeklyTotal from "../Timesheets/WeeklyTotal";
import PTOModal from "./PTO-Modal";
import { BlogPost } from "../Blog";

const Dashboard = () => {
  return (
    <>
      <Row>
        <Col lg="6">
          <Card className="mb-4">
            <CardBody>
              <WeeklyTotal />
            </CardBody>
          </Card>

          <Card className="card mb-4 border-primary">
            <CardHeader>
              <h5>Corporate Message</h5>
            </CardHeader>
            <CardBody>
              Hello Everyone! Just as a reminder that stock bootstrapping series
              A financing channels user experience virality
              business-to-business. Early adopters first mover advantage
              hypotheses.
            </CardBody>
          </Card>
    
        <Card className="mb-4">
            <CardHeader>
              <p className="h5">A Container</p>
            </CardHeader>
            <CardBody>
              <img src="foo.bar" tabIndex="1"/>

            </CardBody>
          </Card>
        </Col>

        <Col lg="6">
          <Card className="mb-4">
            <CardHeader>
              <p className="h5">Request PTO</p>
            </CardHeader>
            <CardBody>
              <p>You have a PTO balance of 32 hours.</p>
              <PTOModal />
            </CardBody>
          </Card>

          <BlogPost latest teaser />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
