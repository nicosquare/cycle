# Cycle
Repository for demo in Gov World Hackathon.

## To install locally

`git clone https://github.com/nicosquare/cycle.git `

Main app is in folder 'app':

`cd cycle/app `

`npm install `


## Context

Places with no access to energy are mostly concentrated in the sub-saharan Africa, in places where installation of infrastructure is challenge due to climatic, geographic and cost  constraints. Mini-grids seems to be a very good alternative  because they offer independent and decentralized options that doesn’t need to be interconnected with the normal electric grids.

The sample case is a village in a place with no access to regular systems of distribution of energy, they’ve opted to implement a mini-grid based on photovoltaic cells. The houses of the village gather energy via solar panels and, as a backup, a central utility company provides extra energy by using other sources and a grid to mobilize the energy.

The houses with solar panels have the potential to produce more energy than needed, it allows to count on a surplus of energy that could be profited by others houses in the system, allowing to think in a system purely based on solar panels.

In order to reach that goal, the distribution system must be decentralized and intelligent, in order to know always where to put the energy that is not being consumed, becoming a system where there’s a permanent exchange of energy all the time.

We are proposing a IOT system based on devices, that we call “Harvesters”. One harvester installed in a house measure the energy flow (incoming-outcoming) and administrate the energy flow by learning the consuming habits in that house and deciding when to preserve energy for local consumption and when to let it flow to the grid in order to be distributed. A net of harvesters form a more intelligent energy distribution system.

Supporting the hardware implementation, machine learning algorithms allows the harvester to learn about the consumption habits on each house and IBM’s IOT service allows to secure and identify each component in the net of harvesters. Energy transactions well be performed over a blockchain network based on Consensys technology by creating a token that will be the piece of exchange among the whole system. More details over token exchange and the rules of its work still being defined right now.

