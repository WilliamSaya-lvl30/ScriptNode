#!/usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');
const axios = require('axios');

const argv = yargs
    .option('site', {
        alias: 's',
        describe: 'choose a site id',
        default: 'MLA'
      })
    .option('seller', {
        alias: 'i',
        description: 'choose a seller id',
        type: 'number',
    })
    .option('name', {
        alias: 'n',
        description: 'choose a name from the file output',
        type: 'string',
    })
    .option('path', {
        alias: 'p',
        description: 'choose a path from the file output',
        type: 'string',
        default: ''
    })
    .help()
    .alias('help', 'h')
    .argv;
 
const getItems = (site, sellers) =>{
    let arrayID = typeof sellers === "object" ? sellers : [sellers]
    arrayID.map( async id=>{

        try {
            const sellerInfo =await axios(`https://api.mercadolibre.com/sites/${site}/search?seller_id=${id}`)
            const sellerItems = sellerInfo.data.results
            const categorys={}
            let dataFile='SELLER_ID\tITEM_TITLE\tCATEGORY_ID\tCATEGORY_NAME\n';
            for (var i = 0; i < sellerItems.length; i++) {
                const category=sellerItems[i].category_id
                if(!categorys[category]){
                    const categoryName = await axios(`https://api.mercadolibre.com/categories/${category}`) 
                    categorys[category] = categoryName.data.name
                }
                dataFile=dataFile+sellerItems[i].id+'\t'+sellerItems[i].title+'\t'+category+'\t'+categorys[category]+'\n';
            }
            if(!sellerItems.length) dataFile=dataFile+"No items found"
            let filename;
            if(argv.name){
                if(arrayID.length > 1){
                    filename = `${argv.name}-${sellerInfo.data.seller.nickname}`
                } else{
                    filename = argv.name
                }
            }else{
                filename = sellerInfo.data.seller.nickname
            }

            fs.appendFile(`${argv.path}${filename}.xls`, dataFile, (err) => {
                if (err) throw err;
                console.log('File created');
            });
    
        } catch (error) {
            console.log(error)
        }        
    })    
}

getItems(argv.site , argv.seller)