





<Accordion open={open === adjustedIndex}>
<AccordionHeader className="" onClick={() => handleOpen(adjustedIndex)}>
  <div className="relative">
    <Image
      src={images[index]}
      alt="poster"
      className="rounded-xl object-cover w-96"
    />

    <div className="absolute top-[20px] left-[20px]  bg-white p-2 rounded-xl">
      <Title style={'mb-0'}>Ряд {adjustedIndex}</Title>
    </div>
  </div>




</AccordionHeader>
<AccordionBody className="">
  <div className="">
  

    {/* <div className="flex justify-between">
      {elem.left && (
        <div className="">
          <Title style="text-left">левая сторона</Title>
          {left?.map((stone) => {
            return (
              <>
                <StoneCard stone={stone} />
              </>
            );
          })}
        </div>
      )}
      {elem.right && (
        <div className="">
          <Title style="text-right">правая сторона</Title>
          {right?.map((stone) => {
            return (
              <>
                <StoneCard stone={stone} />
              </>
            );
          })}
        </div>
      )}
    </div> */}
  </div>
</AccordionBody>
</Accordion>