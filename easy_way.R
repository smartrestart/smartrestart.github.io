library(readxl)
library(ggplot2)
chbase5<-read_excel("input/Corona_Virus_2020_291220.xlsx",sheet="CH 5 base neu",skip=45)

nrow(chbase5)
#when date has no values it is additional data afterwards that should be deleted
chbase5<-chbase5[!is.na(chbase5[,1]),]
#at the last 5 lines there are now till some NAs
chbase5<-chbase5[!apply(is.na(chbase5$Viral_Pot),1,any),]
nrow(chbase5)
names(chbase5)[1]<-"Datum"
names(chbase5)[22]<-"Viral_Pot"
names(chbase5)[27]<-"Value_Infectious"
names(chbase5)[50]<-"Free_Viral"

ggplot(data=chbase5,aes(x=Datum,y=Viral_Pot))+ geom_point() + geom_line()+
  scale_y_continuous(labels = function(x) format(x, scientific = FALSE))

ggplot(data=chbase5,aes(x=Datum,y=Value_Infectious))+ geom_point() + geom_line()+
  scale_y_continuous(labels = function(x) format(x, scientific = FALSE))

ggplot(data=chbase5,aes(x=Datum,y=Free_Viral))+ geom_point() + geom_line()+
  scale_y_continuous(labels = function(x) format(x, scientific = FALSE))

chbaseplus5<-read_excel("input/Corona_Virus_2020_291220.xlsx",sheet="CH 5 baseplus neu (2)",skip=45)

nrow(chbaseplus5)
#when date has no values it is additional data afterwards that should be deleted
chbaseplus5<-chbaseplus5[!is.na(chbaseplus5[,1]),]
#at the last 5 lines there are now till some NAs
chbase5<-chbase5[!apply(is.na(chbase5),1,any),]
nrow(chbaseplus5)
names(chbaseplus5)[1]<-"Datum"
names(chbaseplus5)[22]<-"Viral_Pot"
names(chbaseplus5)[27]<-"Value_Infectious"
names(chbaseplus5)[50]<-"Free_Viral"

#reduce cols
chbase5<-chbase5[,c("Datum","Viral_Pot","Value_Infectious","Free_Viral")]
#cbind()
write.csv(chbase5,"output/data.csv",row.names = FALSE)
