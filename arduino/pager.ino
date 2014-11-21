#include <Wire.h>
#include "rgb_lcd.h"

rgb_lcd lcd;

void setup()
{
    Serial.begin(9600);
    
    // set up the LCD's number of columns and rows:
    lcd.begin(16, 2);    
    lcd.setCursor(0, 1);

    // Print a message to the LCD.
    lcd.print("Ricky's Pager");

    delay(1000);
}

void loop() {
   // Receive data from NodeJS and write it to a String
   String content = "";
   
   for (int positionCounter = 0; positionCounter < 16; positionCounter++) {
     // scroll one position left:
     lcd.scrollDisplayLeft();
     // wait a bit:
     delay(150);
   }
    
   while (Serial.available()) {
     lcd.clear();
     char character = (char)Serial.read();
     content.concat(character);
  }  
  
 if(content != "") {
    lcd.setRGB(random(255), random(255), random(255));
    lcd.setCursor(0, 1);
    lcd.print(content);
    content = "";
  }
}
