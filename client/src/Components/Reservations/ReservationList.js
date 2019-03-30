import React from 'react'
import { Button, Header, Tab, Pagination } from 'semantic-ui-react'
import { FlexColumn, Divider } from 'custom-components'
import ReservationListItem from './ReservationListItem'

export default (props) => {
  const { reservations } = props

  return (
    <FlexColumn width="800px" alignCenter style={{ position: 'relative' }}>
      <Pagination
        className="space-bottom"
        boundaryRange={1}
        defaultActivePage={1}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={10}
      />
      {reservations.map((reservation, ind) => (
        <>
          <ReservationListItem reservation={reservation}/>
          <Divider/>
        </>
      ))}

      <Button color="green" attached="bottom" fluid>
        CREATE RESERVATION
      </Button>
    </FlexColumn>
  )
}
