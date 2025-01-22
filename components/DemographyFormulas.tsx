"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const formulas = [
  {
    name: 'Crude Birth Rate (CBR)',
    formula: 'CBR = (Number of live births / Mid-year population) × 1000',
    steps: [
      '1. Count the number of live births in a year',
      '2. Determine the mid-year population',
      '3. Divide the number of live births by the mid-year population',
      '4. Multiply the result by 1000'
    ]
  },
  {
    name: 'Crude Death Rate (CDR)',
    formula: 'CDR = (Number of deaths / Mid-year population) × 1000',
    steps: [
      '1. Count the number of deaths in a year',
      '2. Determine the mid-year population',
      '3. Divide the number of deaths by the mid-year population',
      '4. Multiply the result by 1000'
    ]
  },
  {
    name: 'Natural Increase Rate (NIR)',
    formula: 'NIR = CBR - CDR',
    steps: [
      '1. Calculate the Crude Birth Rate (CBR)',
      '2. Calculate the Crude Death Rate (CDR)',
      '3. Subtract CDR from CBR'
    ]
  },
  {
    name: 'Total Fertility Rate (TFR)',
    formula: 'TFR = Σ(Age-specific fertility rates) × 5',
    steps: [
      '1. Calculate age-specific fertility rates for each 5-year age group',
      '2. Sum up all the age-specific fertility rates',
      '3. Multiply the sum by 5'
    ]
  },
  {
    name: 'General Fertility Rate (GFR)',
    formula: 'GFR = (Number of live births / Number of women aged 15-49) × 1000',
    steps: [
      '1. Count the number of live births in a year',
      '2. Count the number of women aged 15-49',
      '3. Divide the number of live births by the number of women aged 15-49',
      '4. Multiply the result by 1000'
    ]
  },
  {
    name: 'Net Reproduction Rate (NRR)',
    formula: 'NRR = TFR × (Probability of surviving to mean age of childbearing)',
    steps: [
      '1. Calculate the Total Fertility Rate (TFR)',
      '2. Determine the probability of surviving to the mean age of childbearing',
      '3. Multiply TFR by the probability'
    ]
  },
  {
    name: 'Gross Reproduction Rate (GRR)',
    formula: 'GRR = TFR × (Proportion of female births)',
    steps: [
      '1. Calculate the Total Fertility Rate (TFR)',
      '2. Determine the proportion of female births',
      '3. Multiply TFR by the proportion of female births'
    ]
  },
  {
    name: 'Population Growth Rate (r)',
    formula: 'r = (CBR - CDR + Immigration Rate - Emigration Rate) / 10',
    steps: [
      '1. Calculate the Crude Birth Rate (CBR)',
      '2. Calculate the Crude Death Rate (CDR)',
      '3. Calculate the Immigration Rate',
      '4. Calculate the Emigration Rate',
      '5. Subtract CDR from CBR',
      '6. Add Immigration Rate and subtract Emigration Rate',
      '7. Divide the result by 10'
    ]
  },
  {
    name: 'Doubling Time',
    formula: 'Doubling Time = 70 / r',
    steps: [
      '1. Calculate the Population Growth Rate (r)',
      '2. Divide 70 by r'
    ]
  },
  {
    name: 'Life Expectancy',
    formula: 'e₀ = T₀ / l₀',
    steps: [
      '1. Calculate T₀ (total number of person-years lived by a cohort)',
      '2. Determine l₀ (number of persons alive at age 0)',
      '3. Divide T₀ by l₀'
    ]
  },
  {
    name: 'Infant Mortality Rate (IMR)',
    formula: 'IMR = (Number of infant deaths / Number of live births) × 1000',
    steps: [
      '1. Count the number of infant deaths (under 1 year old) in a year',
      '2. Count the number of live births in the same year',
      '3. Divide the number of infant deaths by the number of live births',
      '4. Multiply the result by 1000'
    ]
  },
  {
    name: 'Child Mortality Rate (CMR)',
    formula: 'CMR = (Number of deaths of children under 5 / Number of live births) × 1000',
    steps: [
      '1. Count the number of deaths of children under 5 years old in a year',
      '2. Count the number of live births in the same year',
      '3. Divide the number of deaths by the number of live births',
      '4. Multiply the result by 1000'
    ]
  },
  {
    name: 'Maternal Mortality Ratio (MMR)',
    formula: 'MMR = (Number of maternal deaths / Number of live births) × 100,000',
    steps: [
      '1. Count the number of maternal deaths in a year',
      '2. Count the number of live births in the same year',
      '3. Divide the number of maternal deaths by the number of live births',
      '4. Multiply the result by 100,000'
    ]
  },
  {
    name: 'Age-Specific Mortality Rate',
    formula: 'ASMR = (Number of deaths in age group / Mid-year population in age group) × 1000',
    steps: [
      '1. Count the number of deaths in a specific age group',
      '2. Determine the mid-year population for that age group',
      '3. Divide the number of deaths by the mid-year population',
      '4. Multiply the result by 1000'
    ]
  },
  {
    name: 'Standardized Mortality Ratio (SMR)',
    formula: 'SMR = (Observed deaths / Expected deaths) × 100',
    steps: [
      '1. Count the number of observed deaths in the population',
      '2. Calculate the number of expected deaths based on a standard population',
      '3. Divide the observed deaths by the expected deaths',
      '4. Multiply the result by 100'
    ]
  },
  {
    name: 'Sex Ratio',
    formula: 'Sex Ratio = (Number of males / Number of females) × 100',
    steps: [
      '1. Count the number of males in the population',
      '2. Count the number of females in the population',
      '3. Divide the number of males by the number of females',
      '4. Multiply the result by 100'
    ]
  },
  {
    name: 'Dependency Ratio',
    formula: 'Dependency Ratio = ((Population under 15 + Population over 64) / Population 15-64) × 100',
    steps: [
      '1. Sum the population under 15 and over 64 years old',
      '2. Determine the population between 15 and 64 years old',
      '3. Divide the sum from step 1 by the result from step 2',
      '4. Multiply the result by 100'
    ]
  },
  {
    name: 'Age-Specific Fertility Rate (ASFR)',
    formula: 'ASFR = (Number of births to women in age group / Number of women in age group) × 1000',
    steps: [
      '1. Count the number of births to women in a specific age group',
      '2. Count the number of women in that age group',
      '3. Divide the number of births by the number of women',
      '4. Multiply the result by 1000'
    ]
  },
  {
    name: 'Net Migration Rate',
    formula: 'Net Migration Rate = (Immigrants - Emigrants) / Mid-year population × 1000',
    steps: [
      '1. Count the number of immigrants in a year',
      '2. Count the number of emigrants in the same year',
      '3. Subtract emigrants from immigrants',
      '4. Divide the result by the mid-year population',
      '5. Multiply by 1000'
    ]
  },
  {
    name: 'Population Density',
    formula: 'Population Density = Total population / Land area',
    steps: [
      '1. Determine the total population',
      '2. Measure the land area',
      '3. Divide the total population by the land area'
    ]
  },
  {
    name: 'Cohort Change Ratio',
    formula: 'Cohort Change Ratio = Population aged x+n at time t+n / Population aged x at time t',
    steps: [
      '1. Determine the population aged x at time t',
      '2. Determine the population aged x+n at time t+n',
      '3. Divide the population at t+n by the population at t'
    ]
  },
  {
    name: 'Child-Woman Ratio',
    formula: 'Child-Woman Ratio = (Population under 5 / Women aged 15-49) × 1000',
    steps: [
      '1. Count the population under 5 years old',
      '2. Count the number of women aged 15-49',
      '3. Divide the population under 5 by the number of women aged 15-49',
      '4. Multiply the result by 1000'
    ]
  },
  {
    name: 'Intrinsic Growth Rate',
    formula: 'r = ln(NRR) / T',
    steps: [
      '1. Calculate the Net Reproduction Rate (NRR)',
      '2. Calculate T (the mean length of generation)',
      '3. Take the natural logarithm of NRR',
      '4. Divide the result by T'
    ]
  },
  {
    name: 'Life Table Survival Ratio',
    formula: 'LTSR = L(x+n) / L(x)',
    steps: [
      '1. Determine L(x) (person-years lived between age x and x+n)',
      '2. Determine L(x+n) (person-years lived between age x+n and x+2n)',
      '3. Divide L(x+n) by L(x)'
    ]
  },
  {
    name: 'Stable Population Growth Rate',
    formula: 'r = ln(λ)',
    steps: [
      '1. Calculate λ (the population growth ratio)',
      '2. Take the natural logarithm of λ'
    ]
  },
  {
    name: 'Total Dependency Ratio',
    formula: 'TDR = ((Population under 15 + Population over 64) / Population 15-64) × 100',
    steps: [
      '1. Sum the population under 15 and over 64 years old',
      '2. Determine the population between 15 and 64 years old',
      '3. Divide the sum from step 1 by the result from step 2',
      '4. Multiply the result by 100'
    ]
  },
  {
    name: 'Youth Dependency Ratio',
    formula: 'YDR = (Population under 15 / Population 15-64) × 100',
    steps: [
      '1. Determine the population under 15 years old',
      '2. Determine the population between 15 and 64 years old',
      '3. Divide the population under 15 by the population 15-64',
      '4. Multiply the result by 100'
    ]
  },
  {
    name: 'Old-Age Dependency Ratio',
    formula: 'OADR = (Population over 64 / Population 15-64) × 100',
    steps: [
      '1. Determine the population over 64 years old',
      '2. Determine the population between 15 and 64 years old',
      '3. Divide the population over 64 by the population 15-64',
      '4. Multiply the result by 100'
    ]
  },
  {
    name: 'Index of Dissimilarity',
    formula: 'ID = 0.5 × Σ|xi/X - yi/Y|',
    steps: [
      '1. Calculate the proportion of each group in each area',
      '2. Take the absolute difference between these proportions',
      '3. Sum these differences',
      '4. Multiply the sum by 0.5'
    ]
  },
  {
    name: 'Lorenz Curve',
    formula: 'Cumulative proportion of population vs Cumulative proportion of characteristic',
    steps: [
      '1. Order the population from lowest to highest based on the characteristic',
      '2. Calculate cumulative proportions of population and characteristic',
      '3. Plot these cumulative proportions against each other'
    ]
  },
  {
    name: 'Gini Coefficient',
    formula: 'G = A / (A + B)',
    steps: [
      '1. Create a Lorenz curve',
      '2. Calculate area A (between the line of equality and Lorenz curve)',
      '3. Calculate area B (below the Lorenz curve)',
      '4. Divide A by the sum of A and B'
    ]
  },
  {
    name: 'Demographic Transition Model',
    formula: 'Descriptive model of population change over time',
    steps: [
      '1. Identify the current stage based on birth and death rates',
      '2. Analyze factors influencing the transition between stages',
      '3. Project future demographic changes based on the model'
    ]
  },
  {
    name: 'Population Momentum',
    formula: 'Ultimate population size / Current population size',
    steps: [
      '1. Project the current population structure to a stable state',
      '2. Calculate the ultimate population size',
      '3. Divide the ultimate population size by the current population size'
    ]
  },
  {
    name: 'Replacement Level Fertility',
    formula: 'TFR ≈ 2.1 in low-mortality populations',
    steps: [
      '1. Calculate the Total Fertility Rate (TFR)',
      '2. Compare the TFR to the replacement level (usually around 2.1)',
      '3. Analyze factors contributing to deviations from replacement level'
    ]
  },
  {
    name: 'Stable Population Theory',
    formula: 'r = b - d (in a closed population)',
    steps: [
      '1. Calculate the birth rate (b)',
      '2. Calculate the death rate (d)',
      '3. Subtract the death rate from the birth rate to get the growth rate (r)',
      '4. Analyze age structure and growth rate for stability'
    ]
  },
  {
    name: 'Population Pyramid',
    formula: 'Graphical representation of age and sex structure',
    steps: [
      '1. Collect data on population by age and sex',
      '2. Calculate percentages for each age-sex group',
      '3. Create horizontal bar chart with males on left, females on right',
      '4. Analyze shape for demographic insights'
    ]
  },
  {
    name: 'Lexis Diagram',
    formula: 'Graphical representation of demographic events over time and age',
    steps: [
      '1. Set up a grid with time on x-axis and age on y-axis',
      '2. Plot demographic events (births, deaths, migrations) on the grid',
      '3. Connect events to show life lines or cohorts',
      '4. Analyze patterns and trends in the diagram'
    ]
  },
  {
    name: 'Coale-Demeny Model Life Tables',
    formula: 'Set of model mortality schedules',
    steps: [
      '1. Determine the level of mortality (e.g., life expectancy at birth)',
      '2. Choose the appropriate regional model (North, South, East, West)',
      '3. Select the corresponding life table values',
      '4. Apply the model to estimate missing demographic parameters'
    ]
  },
  {
    name: 'Brass Logit Life Table System',
    formula: 'logit(l(x)) = α + β * logit(l_s(x))',
    steps: [
      '1. Calculate logit transformations of observed and standard survivorship',
      '2. Estimate α and β parameters through regression',
      '3. Use the relationship to generate a full life table',
      '4. Analyze the resulting life table for demographic insights'
    ]
  }
]

export default function DemographyFormulas() {
  return (
    <div className="space-y-4 p-4 bg-blue-200 border-4 border-black shadow-brutal">
      <h2 className="text-2xl font-bold">Demography Formulas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formulas.map((item, index) => (
          <Card key={index} className="border-2 border-black shadow-brutal">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="formula">
                  <AccordionTrigger>Formula</AccordionTrigger>
                  <AccordionContent>
                    <p className="font-mono text-sm">{item.formula}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="steps">
                  <AccordionTrigger>Calculation Steps</AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal list-inside">
                      {item.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

