@echo off
echo "STARTED....."
for /R %%f in (*.tga) do (tga2png.exe -i %%f
del %%f
)
echo "FINISH!"
pause