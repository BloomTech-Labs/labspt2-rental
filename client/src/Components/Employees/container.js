import { connect } from "react-redux";
import {} from "./actionCreator";
import EmployeeList from "./EmployeeList";

const mapStateToProps = state => ({
  employees: [
    {
      name: 'Jerry Springer',
      userID: 1,
      todayTasks: 8,
      overdueTasks: 4,
      properties: 10,
      imageLoc: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/05/22224952/beagle-puppy-in-large-cushion-chair.jpg'
    },
    {
      name: 'Madeleine Albright',
      userID: 2,
      todayTasks: 12,
      overdueTasks: 2,
      properties: 7,
      imageLoc: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/05/22224952/beagle-puppy-in-large-cushion-chair.jpg'
    },
    {
      name: 'Bobby Orr',
      userID: 3,
      todayTasks: 6,
      overdueTasks: 8,
      properties: 12,
      imageLoc: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/05/22224952/beagle-puppy-in-large-cushion-chair.jpg'
    }
  ]
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeList);
