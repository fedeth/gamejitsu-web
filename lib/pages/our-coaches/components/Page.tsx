import React from "react"
import styled from "styled-components"
import { Flex, Box } from "rebass"
import Head from "next/head"

import { AuthenticatedComponent } from "gamejitsu/interfaces"

import { Footer, Navbar } from "gamejitsu/components"

import { coachData } from "../../../../public/coachData"

import CoachCard from "./CoachCard"

interface SecondaryTitleProps {
  color?: string
}

const Container = styled(Flex)`
  background-color: transparent;
`

const SecondaryTitle = styled.h2<SecondaryTitleProps>`
  font-family: "Japanese 3017";
  font-weight: normal;
  letter-spacing: 3px;
  font-size: 21px;
  color: ${(props) => props.color || props.theme.primaryColor};
`

const MainTitle = styled.h1`
  color: white;
  font-size: 35px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`

const ParagraphText = styled.p`
  font-size: 15px;
  margin-bottom: 5px;
  line-height: 20px;
`

const TextCard = styled(Box)`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  flex-grow: 1;
  z-index: 1;
`

const ParagraphTitle = styled.h3`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 15px;
`

const Title = styled.h1`
  font-weight: bold;
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
`

TextCard.defaultProps = {
  my: 4
}

interface Coach {
  id: number
  name: string
  username: string
  reviewsStars: number
  description: string
  mmr: number
  roles: string[]
  achievements: string[]
  image?: string
  game: string
}

const Page: AuthenticatedComponent = () => (
  <Box mt={4}>
    <Navbar />
    <Container alignItems="center" flexDirection="column">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Gamejitsu - Our Coaches</title>
      </Head>
      <TextCard>
        <Box width="1400px" mx="auto" my={4} style={{ position: "relative" }}>
          <Flex alignItems="center">
            <Box width="375px">
              <SecondaryTitle>Gamejitsu</SecondaryTitle>
              <MainTitle>Our Coaches</MainTitle>
            </Box>
          </Flex>
          <Flex flexWrap="wrap">
            {coachData.length === 0 ? (
              <div />
            ) : (
              coachData.map((coach: Coach) => {
                return <CoachCard key={coach.id} coach={coach} />
              })
            )}
          </Flex>
        </Box>
      </TextCard>

      <Footer />
    </Container>
  </Box>
)

Page.skipAuthentication = true

export default Page