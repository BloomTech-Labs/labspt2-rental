<FlexColumn style={{ width: "100%" }}>

<FlexRow style={{ alignItems: "baseline"}}>
  <Checkbox 
    label={task.description} 
    onChange={this.toggleComplete}
  />
  <Link to={`/dashboard/tasks/edit/${task._id}`}>
    <Popup
      trigger={
        <Label size="mini" circular style={{ marginLeft: "5px", marginRight: "5px" }}>
          <Icon fitted name="info" />
        </Label>
      }
      content="Edit"
    />
  </Link>
</FlexRow>

<FlexRow>
  <Popup 
    trigger={
      <Label 
        as="a"
        color="blue"
        content={task.property.name}
        icon="home"
        style={{ marginTop: "10px" }}
      />
    }
    content={`${task.property.address1} ${
      task.property.city
    } ${task.property.state} ${task.property.zip}`}
  />
</FlexRow>

<FlexRow style={{ width: "100%", justifyContent: "space-between", marginTop: "10px" }}>
  <p>
    <strong>Assignee: </strong>
    {task.assignedTo.firstName} {task.assignedTo.lastName}
  </p>
  <p>
    Due: <strong>{moment(task.endDate).format("MM/DD")}</strong>
  </p>
</FlexRow>

</FlexColumn>











<FlexColumn style={{ width: "100%" }}>

      

<FlexRow style={{ alignItems: "baseline"}}>
  <Checkbox 
    label={task.description} 
    onChange={this.toggleComplete}
  />
  <Link to={`/dashboard/tasks/edit/${task._id}`}>
    <Popup
      trigger={
        <Label size="mini" circular style={{ marginLeft: "5px", marginRight: "5px" }}>
          <Icon fitted name="info" />
        </Label>
      }
      content="Edit"
    />
  </Link>
</FlexRow>

<FlexRow>
  <Popup 
    trigger={
      <Label 
        as="a"
        color="blue"
        content={task.property.name}
        icon="home"
        style={{ marginTop: "10px" }}
      />
    }
    content={`${task.property.address1} ${
      task.property.city
    } ${task.property.state} ${task.property.zip}`}
  />
</FlexRow>



<FlexRow style={{ width: "100%", justifyContent: "space-between", marginTop: "10px" }}>
  <p>
    <strong>Assignee: </strong>
    {task.assignedTo.firstName} {task.assignedTo.lastName}
  </p>
  <p>
    Due: <strong>{moment(task.endDate).format("MM/DD")}</strong>
  </p>
</FlexRow>

</FlexColumn>








<FlexRow
        alignCenter
        justifyBetween
        width="full"
        style={{ marginTop: "5px" }}
        wrap
      >
        
        <FlexRow wrap style={{ justifyContent: "space-between" }}>
          <FlexRow style={{ alignItems: "baseline" }}>
            <Checkbox 
              label={task.description} 
              onChange={this.toggleComplete}
            />
            <Link to={`/dashboard/tasks/edit/${task._id}`}>
              <Popup
                trigger={
                  <Label size="mini" circular style={{ marginLeft: "5px", marginRight: "5px" }}>
                    <Icon fitted name="info" />
                  </Label>
                }
                content="Edit"
              />
            </Link>
          </FlexRow>
          <FlexRow>
            <Popup 
              trigger={
                <Label 
                  as="a"
                  color="blue"
                  content={task.property.name}
                  icon="home"
                />
              }
              content={`${task.property.address1} ${
                task.property.city
              } ${task.property.state} ${task.property.zip}`}
            />
          </FlexRow>
          
          
        </FlexRow>
        
      </FlexRow>








<FlexRow
        alignCenter
        justifyBetween
        width="full"
        style={{ marginTop: "5px" }}
        wrap
      >

      <FlexColumn grow="1" wrap>
        <FlexRow style={{ alignItems: "baseline" }}>
          <Checkbox 
            label={task.description} 
            onChange={this.toggleComplete}
          />
          <Link to={`/dashboard/tasks/edit/${task._id}`}>
            <Popup
              trigger={
                <Label size="mini" circular style={{ marginLeft: "5px", marginRight: "5px" }}>
                  <Icon fitted name="info" />
                </Label>
              }
              content="Edit"
            />
          </Link>
        </FlexRow>
        <p style={{ paddingTop: "10px", paddingLeft: "25px" }}>
          <strong>Assignee: </strong>
          {task.assignedTo.firstName} {task.assignedTo.lastName}
        </p>
      </FlexColumn>

      <FlexColumn style={{ alignItems: "flex-end" }}>
        <Popup 
          trigger={
            <Label 
              as="a"
              color="blue"
              content={task.property.name}
              icon="home"
            />
          }
          content={`${task.property.address1} ${
            task.property.city
          } ${task.property.state} ${task.property.zip}`}
        />
        <p style={{ paddingTop: "5px" }}>
          Due: <strong>{moment(task.endDate).format("MM/DD")}</strong>
        </p>
      </FlexColumn>

    </FlexRow>