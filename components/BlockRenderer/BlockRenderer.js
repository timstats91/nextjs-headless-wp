import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { FormspreeForm } from "components/FormspreeForm";
import { Gallery } from "components/Gallery";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { PostTitle } from "components/PostTitle";
import { PropertyFeatures } from "components/PropertyFeatures";
import { PropertySearch } from "components/PropertySearch";
import { TickItem } from "components/TickItem";
import Image from "next/image";
import { theme } from "theme";

export const BlockRenderer = ({blocks}) => {
    return blocks.map(block => {
        switch(block.name){
            case "core/gallery": {
                return (
                    <Gallery 
                        key={block.id} 
                        columns={block.attributes.columns || 3} 
                        cropImages={block.attributes.imageCrop} 
                        items={block.innerBlocks} 
                    />
                )
            }
            case "core/columns": {
                return (
                    <Columns 
                        key={block.id} 
                        isStackedOnMobile={block.attributes.isStackedOnMobile}
                        textColor={
                            theme[block.attributes.textColor] ||
                            block.attributes.style?.color?.text
                        }
                        backgroundColor={
                            theme[block.attributes.backgroundColor] ||
                            block.attributes.style?.color?.background
                        }
                    >
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Columns>
                )
            }
            case "core/column": {
                return (
                    <Column 
                        key={block.id} 
                        width={block.attributes.width} 
                        textColor={
                            theme[block.attributes.textColor] ||
                            block.attributes.style?.color?.text
                        }
                        backgroundColor={
                            theme[block.attributes.backgroundColor] ||
                            block.attributes.style?.color?.background
                        }
                    >
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Column>
                )
            }
            case "core/block":
            case "core/group": {
                return (
                    <BlockRenderer key={block.id} blocks={block.innerBlocks} />
                )
            }
            case "core/image": {
                return (
                    <Image 
                        key={block.id} 
                        src={block.attributes.url} 
                        height={block.attributes.height} 
                        width={block.attributes.width} 
                        alt={block.attributes.alt || ""} 
                    />
                )
            }
            case "acf/tickitem": {
                return (
                    <TickItem key={block.id}>
                        <BlockRenderer blocks={block.innerBlocks} />
                    </TickItem>
                )
            }
            case "acf/ctabutton": {
                return (
                    <CallToActionButton 
                    key={block.id} 
                    buttonLabel={block.attributes.data.label} 
                    destination={block.attributes.data.destination || "/"} 
                    align={block.attributes.data.align} />
                )
            }
            case "acf/propertysearch": {
                return (
                    <PropertySearch key={block.id} />
                )
            }
            case "acf/propertyfeatures": {
                return (
                    <PropertyFeatures key={block.id} />
                )
            }
            case "acf/formspreeform": {
                return (
                    <FormspreeForm key={block.id} formId={block.attributes.data.form_id} />
                )
            }
            case "core/paragraph": {
                return (
                    <Paragraph 
                    key={block.id} 
                    textAlign={block.attributes.align} 
                    content={block.attributes.content} 
                    textColor={
                        theme[block.attributes.textColor] ||
                        block.attributes.style?.color?.text
                    } />
                )
            }
            case "core/heading": {
                return <Heading 
                    key={block.id} 
                    level={block.attributes.level} 
                    content={block.attributes.content} 
                    textAlign={block.attributes.textAlign} />;
            }
            case "core/post-title": {
                return (
                    <PostTitle key={block.id} level={block.attributes.level} textAlign={block.attributes.textAlign} />
                )
            }
            case "core/cover": {
                return <Cover key={block.id} background={block.attributes.url}>
                    <BlockRenderer blocks={block.innerBlocks} />
                </Cover>;
            }
            default:
                return null;
        }
    })
}