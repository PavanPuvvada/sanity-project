// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat(
    [
      {
        name:'author',
        type:'document',
        title:'Author',
        fields:[
          {
          name:'name',
          title:'Name',
          type:'string'
        },
        {
          name:'avatar',
          title:'Avatar',
          type:'image'
        },
        {
          name:'date',
          title: 'Date Time',
          type:'datetime'
        }
      ]
      },
      {

        name : 'blog',
        type:'document',
        title:'Blog',
        fields:[
          {
            name:'title',
            type:'string',
            title:'Title',
            validation: (Rule) => {return Rule.required().min(5)}
          },
          {
            name:'subtitle',
            type:'string',
            titlew:'Subtitle'
          },
          {
            name:'coverimage',
            title: 'Cover Image',
            type:'image',
            
            options:{
              hotspot:true
            },
            fields:[{
              type:'text',
              name: 'alt',
              title:'Description',
              
            }],
          },
          {
            name:'content',
            title: 'Content',
            type: 'array',
            of:[{

              type:'block'
            },
            {
              type:'image',
              
              fields:[
                {
                  title:'Position',
                  name:'position',
                  type:'string',
                 
                  options:{
                    list:[
                      {title:'Center', value:'center'},
                      {title:'Left', value:'left'},
                      {title:'Right', value:'right'},
                    ],
                    layout:'radio',
                    isHighlighted:true
                  } 
                },
                {
                type:'text',
                name: 'alt',
                title:'Description',
                options:{
                  isHighlighted: true
                }
              }],
              
                options:{
                  hotspot:true
                }
              },
              {
                type:'code',
                options:{
                  withFilename: true
                }
              }
            ]
          },
          {
            name:'datetimes',
            title: 'Date Time',
            type:'datetime',
            validation: Rule =>  Rule.required()
            
          },
          {
            name:'author',
            title:'Author',
            type:'reference',
            to:[{
              type:'author'
            }],
            validation: Rule =>  Rule.required()
           
          },
          {
            name:'slug',
            type:'slug',
            title:'Slug',
            validation: Rule =>  Rule.required()
            
          }
        ]
      }

  ]),
})
