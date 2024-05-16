# cp /Users/bencelsi/LocalDrive/Images/Photography/Instagram/good/*.* tmp/
mkdir tmp
i=0
for file in *.jpeg
do
  echo 'renaming $file to $i.jpeg'
  mv "$file" "tmp/${i}.jpeg"
  i=$((i+1))
done
cp tmp/* .
rm -rf tmp