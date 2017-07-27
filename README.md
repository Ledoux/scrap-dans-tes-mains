# scrap-dans-tes-mains

[![npm version](https://badge.fury.io/js/scrap-dans-tes-mains.svg)](https://badge.fury.io/js/scrap-dans-tes-mains)

<table>
  <td>
    <img src="https://s3.amazonaws.com/verifact/icons/scrapper.png" alt="icon" />
  </td>
  <td>
    All the scrappers we need to get content from l'internet mondial.
  </td>
</table>

## Install

  1. Yarn is a promising node package manager. We recommend to use it.
  So first make sure you have a global version of it (https://yarnpkg.com/en/docs/install).

  2. Install the node_modules with
  ```bash
    yarn
  ```

  3. Symlink the 'scrap' binary command
  ```bash
    yarn symlink
  ```

## Run locally

  1. Launch just once a watcher that will transpile
  your babel src files into vanilla javascript lib files anytime you do change in your src scrapper files.
  ```bash
    yarn dev
  ```

  2. You can execute a scrap run with the following command, for example
  ```bash
    scrap --url=https://www.washingtonpost.com/world/national-security/american-strikes-against-syria-prompt-both-praise-and-condemnation/2017/04/07/df58e194-1bb1-11e7-855e-4824bbb5d748_story.html?hpid=hp_hp-top-table-main_ussyria-820pm%3Ahomepage%2Fstory&utm_term=.1d9f998edc55
  ```
  Or run directly the node scripts/scrap.js file.

## Add a new scrapper

  1. Follow the example given with src/www_washingtonpost_com.js, and create your own

  2. Don't forget to add a test file in the test folder, and run the test !
  ```bash
    yarn test
  ```
